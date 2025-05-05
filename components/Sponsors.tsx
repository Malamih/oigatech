import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export const Sponsors = () => {
  const folderLocation = "/sponsers";
  const sponsorsGroup = [
    {
      name: "Sponsored By",
      logos: ["/1.png"],
    },
    {
      name: "In association with",
      logos: ["/2.png", "/3.png", "/4.png", "/5.png"],
    },
    {
      name: "Host Venue",
      logos: ["/6.png"],
    },
    {
      name: "Organized By",
      logos: ["/7.png"],
    },
    {
      name: "ISO Certificate",
      logos: ["/8.png", "/9.png"],
    },
    {
      name: "Member Of",
      logos: ["/10.png", "/11.png", "/12.png", "/13.png"],
    },
  ];
  return (
    <div
      className="sponsors my-2 flex flex-wrap gap-4 px-4 py-3 self-center max-w-[700px] lg:max-w-[400px] w-full rounded-tr-2xl rounded-br-2xl rounded-tl-2xl rounded-bl-2xl lg:rounded-tl-[0] lg:rounded-bl-[0]"
      style={{ background: "linear-gradient(to bottom, #EA4C29, #F6AD20)" }}
    >
      {sponsorsGroup.map((group, i: number) => {
        return (
          <div className="group w-full sm:w-[calc(50%-16px)]" key={i}>
            <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
              {group.name}
            </h1>
            <div
              className="logos flex items-center justify-center sm:grid sm:items-start sm:justify-start flex-wrap gap-3 "
              style={{
                gridTemplateColumns: "repeat(2, minmax(50px, 1fr))",
              }}
            >
              {group.logos.map((logo, i: number) => {
                return (
                  <div className="logo flex items-start justify-center" key={i}>
                    <Image
                      src={folderLocation + logo}
                      width={50}
                      height={100}
                      alt="logo"
                      className="h-auto w-[80px] lg:w-[50px]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="contact text-white mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Phone className="stroke-white" width={20} />
          <span>+964 7806 666 661 - +964 7702 444 844</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="stroke-white" width={20} />
          <span>info@unitedevents.iq</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="icon w-[40px] h-[40px] border-2 rounded-full border-white flex items-center justify-center">
            <Facebook />
          </div>
          <div className="icon w-[40px] h-[40px] border-2 rounded-full border-white flex items-center justify-center">
            <Instagram />
          </div>
          <div className="icon w-[40px] h-[40px] border-2 rounded-full border-white flex items-center justify-center">
            <Linkedin />
          </div>
        </div>
      </div>
    </div>
  );
};
