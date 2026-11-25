import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "How an Advisor AI Solutions engagement works";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Process", title: "From market map to partnership." });
}
