import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Free AI Visibility Score for AEC firms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Score", title: "Get your free AI Visibility Score." });
}
