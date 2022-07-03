import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="pb-16">
      <div className="bg-white w-full fixed z-10">
        <header className="flex justify-between p-2 max-w-7xl mx-auto ">
          <div className="flex items-center space-x-5 ">
            <Link href="/">
              <a>
                <Image
                  className="cursor-pointer"
                  src="/images/logo-black.png"
                  height={44}
                  width={160}
                  alt=""
                ></Image>
              </a>
            </Link>
            <div className="hidden md:inline-flex items-center space-x-5">
              <h3>Home</h3>
              <h3>Contact</h3>
              <h3 className="text-white bg-black px-4 py-1 rounded-full">
                Submit
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-5 text-black">
            <h3>Sign In</h3>
            <h3 className="border px-4 py-1 rounded-md bg-black text-white">
              Subscribe
            </h3>
          </div>
        </header>
      </div>
    </div>
  );
}
