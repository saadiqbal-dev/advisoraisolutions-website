import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Advisor AI Solutions Podcast";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Podcast", title: "Conversations with AEC leaders." });
}
