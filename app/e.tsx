import Image from "next/image";
import "./globals.css";
import { Header } from "@/components/Header";
import { Sponsors } from "@/components/Sponsors";

const NotFound = () => {
  return (
    <div
      className={`antialiased flex items-center p-2 lg:p-0 justify-center min-h-[100vh] overflow-x-hidden bg-[#973f0f]`}
    >
      <div className="bg absolute top-0 left-0 w-full h-full z-0 opacity-[30%]">
        <Image
          src={"/background.png"}
          alt="background"
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div className="page flex flex-col lg:flex-row z-10 relative p-4">
        <div className="content relative p-4 flex flex-col bg-white rounded-tl-2xl rounded-bl-2xl max-w-[700px] w-auto">
          <Image
            src={"/content-background.png"}
            fill
            alt="background"
            className="z-0 opacity-50 object-cover"
            draggable={false}
          />
          <Header />
          <div className="wrapper w-full flex-[1] flex items-center justify-center relative z-10">
            <h1 className="text-xl font-medium">
              This page seems to be not found!
            </h1>
          </div>
        </div>
        <Sponsors />
      </div>
    </div>
  );
};

export default NotFound;
