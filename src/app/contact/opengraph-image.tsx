import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Contact Advisor AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Contact", title: "Book a 30-minute discovery call." });
}
