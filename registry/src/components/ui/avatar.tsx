"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const sizeClasses = {
  sm: "size-7 text-xs",
  default: "size-9 text-sm",
  lg: "size-11 text-base",
  xl: "size-14 text-lg",
}

type AvatarSize = keyof typeof sizeClasses

type AvatarContextValue = { size: AvatarSize }
const AvatarContext = React.createContext<AvatarContextValue>({ size: "default" })

/**
 * @description Circular avatar container. Compose with `AvatarImage` and
 * `AvatarFallback` to display a user's profile picture or their initials when
 * the image is unavailable.
 *
 * Sizes:
 * - `"sm"`, 28px
 * - `"default"`, 36px
 * - `"lg"`, 44px
 * - `"xl"`, 56px
 *
 * @example
 * <Avatar size="lg">
 *   <AvatarImage src="/user.jpg" alt="Jane Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 */
function Avatar({
  className,
  size = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  /** Size of the avatar circle. @default "default" */
  size?: AvatarSize
}) {
  return (
    <AvatarContext.Provider value={{ size }}>
      <span
        data-slot="avatar"
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          "transition-shadow hover:shadow-md outline-none",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  )
}

/**
 * @description The `<img>` element inside an `Avatar`. When the image fails to
 * load, the `AvatarFallback` sibling is shown automatically.
 *
 * @param src - URL of the image.
 * @param alt - Accessible alt text for the image.
 */
function AvatarImage({
  className,
  src,
  alt = "",
  onError,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = React.useState(false)

  if (failed) return null

  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      onError={(e) => {
        setFailed(true)
        onError?.(e)
      }}
      {...props}
    />
  )
}

/**
 * @description Fallback content shown when `AvatarImage` fails or is absent.
 * Typically displays 1–2 initials.
 *
 * @example
 * <AvatarFallback>JD</AvatarFallback>
 */
function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium select-none",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
