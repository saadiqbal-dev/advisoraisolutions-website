import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const shown = title.length > 120 ? `${title.slice(0, 117).trimEnd()}…` : title;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060D1A",
          color: "#EDEBE6",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: "2px solid #C5A55A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C5A55A",
              fontSize: 20,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 22, letterSpacing: 1, color: "#C5A55A", fontFamily: "sans-serif" }}>
            Advisor AI Solutions
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#C5A55A",
              fontFamily: "sans-serif",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 64, lineHeight: 1.08, letterSpacing: -1, maxWidth: 1000 }}>{shown}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#9AA3B2", fontSize: 20, fontFamily: "sans-serif" }}>
          <div>AEC-exclusive AI growth systems</div>
          <div>advisoraisolutions.io</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
