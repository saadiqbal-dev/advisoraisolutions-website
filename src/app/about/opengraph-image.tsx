import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "About Jordan Salvador and Advisor AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About", title: "Operator-built systems for firms that build." });
}
