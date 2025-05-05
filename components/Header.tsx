import Image from "next/image";

export const Header = () => {
  return (
    <header className="z-1 relative">
      <div className="content flex flex-col sm:flex-row gap-6 pb-4">
        <div className="logo min-w-[177px]">
          <Image src={"/header-logo.png"} alt="logo" width={177} height={100} />
        </div>
        <div className="title">
          <h1 className="font-medium text-xl underline mb-2">
            OIGATECH - Iraq Oil and Gas Technology Exhibition
          </h1>
          <p>
            The 13th session of Iraq Defense Exhibition for the period from
            April 19th - 22nd, 2025 - Baghdad int. Fairground, Baghdad, Iraq
          </p>
        </div>
      </div>
      <div className="line w-[calc(100%-32px)] m-auto h-[1.6px] bg-gray-400"></div>
    </header>
  );
};
