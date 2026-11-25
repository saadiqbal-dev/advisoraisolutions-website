import Image from "next/image";

const shots = [
  { src: "/visuals/blueprint.webp", frame: "bg-[#FF4D8D]", alt: "" },
  { src: "/visuals/building.webp", frame: "bg-[#12182A]", alt: "" },
  { src: "/visuals/joint.webp", frame: "bg-[#FFC53D]", alt: "" },
];

export function MediaRail() {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3" aria-hidden="true">
      {shots.map((shot) => (
        <div key={shot.src} className={`tile tile-hover relative aspect-[4/3] ${shot.frame} p-1.5`}>
          <div className="relative h-full overflow-hidden rounded-[0.9rem]">
            <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 33vw, 280px" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}
