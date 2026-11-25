import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "FAQ — Advisor AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "FAQ", title: "Answered straight." });
}
