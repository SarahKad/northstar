"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type CarouselContextValue = {
  current: number
  count: number
  loop: boolean
  goTo: (index: number) => void
  snapTo: (index: number) => void
  setCount: (n: number) => void
  prev: () => void
  next: () => void
}

const CarouselContext = React.createContext<CarouselContextValue>({
  current: 0,
  count: 0,
  loop: false,
  goTo: () => {},
  snapTo: () => {},
  setCount: () => {},
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
  const indexModeRef = React.useRef<"logical" | "extended">("logical")

  const snapTo = React.useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const goTo = React.useCallback(
    (index: number) => {
      setCurrent(loop ? index + 1 : index)
    },
    [loop]
  )

  React.useEffect(() => {
    if (!count) return

    if (loop && count > 1 && indexModeRef.current === "logical") {
      setCurrent((c) => c + 1)
      indexModeRef.current = "extended"
    } else if (!loop && indexModeRef.current === "extended") {
      setCurrent((c) => c - 1)
      indexModeRef.current = "logical"
    }
  }, [loop, count])

  const prev = React.useCallback(() => {
    setCurrent((c) => {
      if (loop && count > 1) return c - 1
      if (c === 0) return 0
      return c - 1
    })
  }, [count, loop])

  const next = React.useCallback(() => {
    setCurrent((c) => {
      if (loop && count > 1) return c + 1
      if (c === count - 1) return count - 1
      return c + 1
    })
  }, [count, loop])

  React.useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [autoPlay, next])

  return (
    <CarouselContext.Provider
      value={{ current, count, loop, goTo, snapTo, setCount, prev, next }}
    >
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function cloneSlide(slide: React.ReactNode, key: string) {
  if (!React.isValidElement(slide)) return slide

  return React.cloneElement(slide, {
    key,
    "data-carousel-clone": "",
    "aria-hidden": true,
  } as React.HTMLAttributes<HTMLElement>)
}

/**
 * @description The sliding track that holds all `CarouselItem` children.
 * Uses CSS translate-x for smooth slide transitions. When `loop` is enabled,
 * clones the first and last slides so the track always advances in the same
 * direction, then snaps without animation to the real slide.
 */
function CarouselContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { current, count, loop, snapTo, setCount } = React.useContext(CarouselContext)
  const [disableTransition, setDisableTransition] = React.useState(false)
  const items = React.useMemo(() => React.Children.toArray(children), [children])

  React.useEffect(() => {
    setCount(items.length)
  }, [items.length, setCount])

  const slides =
    loop && items.length > 1
      ? [cloneSlide(items[items.length - 1], "carousel-clone-start"), ...items, cloneSlide(items[0], "carousel-clone-end")]
      : items

  const handleTransitionEnd = () => {
    if (!loop || items.length <= 1) return

    if (current === 0) {
      setDisableTransition(true)
      snapTo(items.length)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false))
      })
    } else if (current === items.length + 1) {
      setDisableTransition(true)
      snapTo(1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false))
      })
    }
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <div
        data-slot="carousel-content"
        className={cn(
          "flex ease-in-out",
          disableTransition ? "transition-none" : "transition-transform duration-300",
          className
        )}
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
        {...props}
      >
        {slides}
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

function getLogicalIndex(current: number, count: number, loop: boolean) {
  if (!loop || count <= 1) return current
  if (current === 0) return count - 1
  if (current === count + 1) return 0
  return current - 1
}

/**
 * @description Previous slide navigation button. Disabled at the first slide
 * unless `loop` is enabled on the parent `Carousel`.
 */
function CarouselPrev({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { prev, current, count, loop } = React.useContext(CarouselContext)
  const logicalIndex = getLogicalIndex(current, count, loop)
  const disabled = !loop && logicalIndex === 0

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
  const logicalIndex = getLogicalIndex(current, count, loop)
  const disabled = !loop && logicalIndex === count - 1

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
