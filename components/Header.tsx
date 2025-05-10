import Image from "next/image";

export const Header = () => {
  return (
    <header className="z-1 relative">
      <div className="content flex flex-col sm:flex-row gap-6 pb-1">
        <div className="logo min-w-[200px]">
          <Image src={"/header-logo.png"} alt="logo" width={200} height={100} />
        </div>
        <div className="title">
          <h1 className="font-medium text-2xl underline mb-2">
            Iraq Oil and Gas Technology Exhibition “OIGATECH 2025”
          </h1>
          <p>
            Iraq Oil and Gas Technology Exhibition for the period from 1-6 June
            2025 on the grounds of Baghdad International Fair.
          </p>
        </div>
      </div>
      <div className="line w-[calc(100%)] m-auto h-[1.6px] bg-gray-400"></div>
    </header>
  );
};
