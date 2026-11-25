import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Terms of use";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Terms", title: "Website terms, plainly stated." });
}
