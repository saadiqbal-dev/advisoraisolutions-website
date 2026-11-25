import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Advisor AI Solutions — AI growth systems for AEC firms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "AEC-exclusive",
    title: "Your prospects are asking AI where to find you.",
  });
}
