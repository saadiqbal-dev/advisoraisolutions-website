import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "AI Growth System for AEC firms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Services", title: "Four pillars. One pipeline." });
}
