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

type AvatarContextValue = {
  size: AvatarSize
  imageStatus: "loading" | "loaded" | "error"
  setImageStatus: (status: "loading" | "loaded" | "error") => void
}

const AvatarContext = React.createContext<AvatarContextValue>({
  size: "default",
  imageStatus: "loading",
  setImageStatus: () => {},
})

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
  const [imageStatus, setImageStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading"
  )

  return (
    <AvatarContext.Provider value={{ size, imageStatus, setImageStatus }}>
      <span
        data-slot="avatar"
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          "border-0 border-transparent shadow-none outline-none ring-0",
          "transition-shadow hover:shadow-md",
          sizeClasses[size],
          className
        )}
        style={{ border: "none", boxShadow: "none", outline: "none" }}
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
  onLoad,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { imageStatus, setImageStatus } = React.useContext(AvatarContext)

  React.useEffect(() => {
    setImageStatus("loading")
  }, [src, setImageStatus])

  if (imageStatus === "error" || !src) return null

  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={cn(
        "h-full w-full border-0 object-cover outline-none ring-0",
        className
      )}
      style={{ border: "none", outline: "none" }}
      onLoad={(e) => {
        setImageStatus("loaded")
        onLoad?.(e)
      }}
      onError={(e) => {
        setImageStatus("error")
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
  const { imageStatus } = React.useContext(AvatarContext)

  if (imageStatus === "loaded") return null

  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-full",
        "border-0 border-transparent bg-muted text-muted-foreground font-medium",
        "select-none shadow-none outline-none ring-0",
        className
      )}
      style={{ border: "none", boxShadow: "none", outline: "none" }}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
