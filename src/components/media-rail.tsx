import Image from "next/image";

const sets = {
  system: [
    { src: "/visuals/ai-search.webp", frame: "bg-[#C5A55A]" },
    { src: "/visuals/calendar.webp", frame: "bg-[#111F38]" },
    { src: "/visuals/workflow.webp", frame: "bg-[#C5A55A]" },
  ],
  show: [
    { src: "/visuals/player.webp", frame: "bg-[#C5A55A]" },
    { src: "/visuals/microphone.webp", frame: "bg-[#111F38]" },
    { src: "/visuals/waveform.webp", frame: "bg-[#C5A55A]" },
  ],
  pipeline: [
    { src: "/visuals/inbox.webp", frame: "bg-[#111F38]" },
    { src: "/visuals/dashboard.webp", frame: "bg-[#C5A55A]" },
    { src: "/visuals/workflow.webp", frame: "bg-[#111F38]" },
  ],
} as const;

export function MediaRail({ set = "system" }: { set?: keyof typeof sets }) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3" aria-hidden="true">
      {sets[set].map((shot) => (
        <div key={shot.src} className={`tile tile-hover relative aspect-[4/3] ${shot.frame} p-1.5`}>
          <div className="relative h-full overflow-hidden rounded-[0.9rem]">
            <Image src={shot.src} alt="" fill sizes="(max-width: 768px) 33vw, 280px" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}
