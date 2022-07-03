import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex justify-between items-center   bg-yellow-400 border-y border-black py-10  lg:py-0">
      <div className="px-5 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-green-600 decoration-4 pr-3">
            Loom
          </span>{" "}
          is a place to write, read and have fun!
        </h1>
        <h2>This is a sub heading</h2>
      </div>
      <img
        className="hidden lg:inline-flex h-32 lg:h-full"
        src="/images/mini-logo-black.png"
        alt=""
      />
    </div>
  );
}
