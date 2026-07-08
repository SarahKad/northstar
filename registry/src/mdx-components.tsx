import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "@/components/registry/code-block"
import React from "react"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, id }) => (
      <h1
        id={id}
        className="font-heading text-4xl tracking-tight mb-4 scroll-mt-6"
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      // MDX prose context, explicitly Atkinson so it can render at smaller sizes
      // without violating the Instrument Serif ≥36px rule
      <h2
        id={id}
        className="font-sans text-xl font-semibold mt-10 mb-3 scroll-mt-6"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        className="font-sans text-base font-medium mt-6 mb-2 scroll-mt-6"
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 flex flex-col gap-1.5">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-sm text-muted-foreground mb-4 flex flex-col gap-1.5">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    code: ({ children }) => (
      <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded-none">
        {children}
      </code>
    ),
    pre: ({ children }) => {
      const codeEl = children as React.ReactElement<{ children?: string }>
      const codeString = String(codeEl?.props?.children ?? "").replace(/\n$/, "")
      return (
        <div className="mb-4">
          <CodeBlock code={codeString} />
        </div>
      )
    },
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-border pl-4 text-sm text-muted-foreground italic mb-4">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="text-left border-b px-3 py-2 font-medium text-xs uppercase tracking-wider text-muted-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b px-3 py-2 text-sm text-muted-foreground">
        {children}
      </td>
    ),
    hr: () => <hr className="my-8 border-border" />,
    ...components,
  }
}
