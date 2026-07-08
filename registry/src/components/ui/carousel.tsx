"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type CarouselContextValue = {
  current: number
  count: number
  loop: boolean
  goTo: (index: number) => void
  prev: () => void
  next: () => void
}

const CarouselContext = React.createContext<CarouselContextValue>({
  current: 0,
  count: 0,
  loop: false,
  goTo: () => {},
  prev: () => {},
  next: () => {},
})

/**
 * @description Carousel root container. Manages slide index state, optional
 * looping, and auto-play. Compose with `CarouselContent`, `CarouselItem`,
 * `CarouselPrev`, and `CarouselNext`.
 *
 * @example
 * <Carousel loop autoPlay>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrev />
 *   <CarouselNext />
 * </Carousel>
 */
function Carousel({
  className,
  loop = false,
  autoPlay = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Whether the carousel wraps from last to first and vice versa. @default false */
  loop?: boolean
  /** Auto-advance slides every 3 seconds. @default false */
  autoPlay?: boolean
}) {
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const goTo = React.useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const prev = React.useCallback(() => {
    setCurrent((c) => {
      if (c === 0) return loop ? count - 1 : 0
      return c - 1
    })
  }, [count, loop])

  const next = React.useCallback(() => {
    setCurrent((c) => {
      if (c === count - 1) return loop ? 0 : count - 1
      return c + 1
    })
  }, [count, loop])

  React.useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [autoPlay, next])

  return (
    <CarouselContext.Provider value={{ current, count, loop, goTo, prev, next }}>
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        className={cn("relative", className)}
        {...props}
      >
        <CountSetter setCount={setCount} />
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

/** Internal helper that counts CarouselItem children via DOM after render. */
function CountSetter({ setCount }: { setCount: (n: number) => void }) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const parent = ref.current?.closest("[data-slot='carousel']")
    if (!parent) return
    const track = parent.querySelector("[data-slot='carousel-content']")
    if (!track) return
    const items = track.querySelectorAll("[data-slot='carousel-item']")
    setCount(items.length)
  })
  return <div ref={ref} className="hidden" />
}

/**
 * @description The sliding track that holds all `CarouselItem` children.
 * Uses CSS translate-x for smooth slide transitions.
 */
function CarouselContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { current } = React.useContext(CarouselContext)
  return (
    <div className="overflow-hidden rounded-lg">
      <div
        data-slot="carousel-content"
        className={cn("flex transition-transform duration-300 ease-in-out", className)}
        style={{ transform: `translateX(-${current * 100}%)` }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * @description An individual slide within the carousel. Each item takes up 100%
 * width of the carousel viewport.
 */
function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
}

/**
 * @description Previous slide navigation button. Disabled at the first slide
 * unless `loop` is enabled on the parent `Carousel`.
 */
function CarouselPrev({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { prev, current, loop } = React.useContext(CarouselContext)
  const disabled = !loop && current === 0
  return (
    <button
      data-slot="carousel-prev"
      onClick={prev}
      disabled={disabled}
      aria-label="Previous slide"
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2 z-10",
        "flex size-8 items-center justify-center rounded-full",
        "bg-background/80 border border-border text-foreground shadow-sm",
        "hover:bg-background transition-colors",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <ArrowLeft className="size-4" />
    </button>
  )
}

/**
 * @description Next slide navigation button. Disabled at the last slide unless
 * `loop` is enabled on the parent `Carousel`.
 */
function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { next, current, count, loop } = React.useContext(CarouselContext)
  const disabled = !loop && current === count - 1
  return (
    <button
      data-slot="carousel-next"
      onClick={next}
      disabled={disabled}
      aria-label="Next slide"
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 z-10",
        "flex size-8 items-center justify-center rounded-full",
        "bg-background/80 border border-border text-foreground shadow-sm",
        "hover:bg-background transition-colors",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <ArrowRight className="size-4" />
    </button>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrev, CarouselNext }
