import Image from "next/image";

export function NavUser({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-fit">
      <Image
        src={imageUrl}
        className="rounded-full"
        width={28}
        height={28}
        alt=""
      />
    </div>
  );
}
