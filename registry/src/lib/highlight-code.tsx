import * as React from "react"

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "const",
  "let",
  "var",
  "type",
  "interface",
  "return",
  "function",
  "async",
  "await",
  "new",
  "default",
])

function pushText(nodes: React.ReactNode[], text: string, key: string, className?: string) {
  if (!text) return
  nodes.push(
    className ? (
      <span key={key} className={className}>
        {text}
      </span>
    ) : (
      <React.Fragment key={key}>{text}</React.Fragment>
    )
  )
}

function readString(line: string, start: number): number {
  const quote = line[start]
  let i = start + 1
  while (i < line.length) {
    if (line[i] === "\\") {
      i += 2
      continue
    }
    if (line[i] === quote) return i + 1
    i += 1
  }
  return line.length
}

function highlightLine(line: string, lineKey: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let i = 0
  let token = 0

  while (i < line.length) {
    const rest = line.slice(i)

    if (line[i] === '"' || line[i] === "'") {
      const end = readString(line, i)
      pushText(nodes, line.slice(i, end), `${lineKey}-s-${token++}`, "text-[#df3079]")
      i = end
      continue
    }

    const jsxClose = rest.match(/^<\/([A-Z][A-Za-z0-9]*)/)
    if (jsxClose) {
      pushText(nodes, "</", `${lineKey}-jc-${token++}`)
      pushText(nodes, jsxClose[1], `${lineKey}-jcn-${token++}`, "text-[#3b82f6]")
      i += jsxClose[0].length
      continue
    }

    const jsxOpen = rest.match(/^<([A-Z][A-Za-z0-9]*)/)
    if (jsxOpen) {
      pushText(nodes, "<", `${lineKey}-jo-${token++}`)
      pushText(nodes, jsxOpen[1], `${lineKey}-jon-${token++}`, "text-[#3b82f6]")
      i += jsxOpen[0].length
      continue
    }

    if (rest.startsWith("/>")) {
      pushText(nodes, "/>", `${lineKey}-self-${token++}`)
      i += 2
      continue
    }

    const word = rest.match(/^([A-Za-z_$][\w$]*)/)
    if (word) {
      const [value] = word
      const next = line[i + value.length]
      if (KEYWORDS.has(value)) {
        pushText(nodes, value, `${lineKey}-kw-${token++}`, "text-[#df3079]")
      } else if (next === "=") {
        pushText(nodes, value, `${lineKey}-attr-${token++}`, "text-[#8b5cf6]")
      } else {
        pushText(nodes, value, `${lineKey}-id-${token++}`)
      }
      i += value.length
      continue
    }

    pushText(nodes, line[i], `${lineKey}-ch-${token++}`)
    i += 1
  }

  return nodes
}

export function highlightCode(code: string): React.ReactNode {
  const lines = code.split("\n")
  return (
    <>
      {lines.map((line, index) => (
        <React.Fragment key={`line-${index}`}>
          {index > 0 ? "\n" : null}
          {highlightLine(line, `l-${index}`)}
        </React.Fragment>
      ))}
    </>
  )
}

/** Split import lines from usage so each can render in its own block. */
export function splitCodeBlocks(code: string): string[] {
  const lines = code.split("\n")
  const imports: string[] = []
  const body: string[] = []
  let sawBody = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!sawBody && (trimmed.startsWith("import ") || (trimmed === "" && imports.length > 0))) {
      if (trimmed) imports.push(line)
      continue
    }
    sawBody = true
    body.push(line)
  }

  const blocks: string[] = []
  if (imports.length > 0) blocks.push(imports.join("\n"))
  const bodyText = body.join("\n").trim()
  if (bodyText) blocks.push(bodyText)
  return blocks.length > 0 ? blocks : [code]
}
