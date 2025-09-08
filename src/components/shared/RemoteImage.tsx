import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

type RemoteImageProps = {
  className?: string;
  src: string;
  alt?: string;
  loading?: "lazy" | "eager";
  prefix?: string;
} & Omit<ImageProps, "src" | "alt">; // نلغي src و alt من ImageProps علشان نتحكم فيهم

function RemoteImage({
  className,
  src,
  alt = "Image",
  loading = "lazy",
  prefix = "static",
  width = 64, // default width (ممكن تغيريه)
  height = 64, // default height
  ...rest
}: RemoteImageProps) {
  // Don't render if src is empty or invalid
  if (!src || typeof src !== "string" || src.trim() === "") {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_API_URL;

  // Don't render if API URL is not available
  if (!url) {
    return null;
  }

  try {
    const origin = new URL(url).origin;

    // Handle cases where src already includes the full path
    const imageSrc = src.startsWith("http")
      ? src
      : prefix
      ? `${origin}/${prefix}/${src}`
      : `${origin}/${src}`;

    return (
      <Image
        src={imageSrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={cn("h-16 w-16 rounded-lg object-cover", className)}
        {...rest}
      />
    );
  } catch {
    console.warn("Invalid API URL:", url);
    return null;
  }
}

export default RemoteImage;
