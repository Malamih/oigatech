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
    {
      name: "Diamond Sponsor",
      logos: ["/14.png"],
    },
  ];
  return (
    <div
      className="sponsors overflow-hidden my-3 flex flex-wrap gap-4 px-4 py-4 self-center max-w-[700px] lg:max-w-[400px] w-full rounded-tr-2xl rounded-br-2xl rounded-tl-2xl rounded-bl-2xl lg:rounded-tl-[0] lg:rounded-bl-[0]"
      style={{ background: "linear-gradient(to bottom, #EA4C29, #F6AD20)" }}
    >
      {sponsorsGroup.map((group, i: number) => {
        return (
          <div className="group w-full sm:w-[calc(50%-16px)]" key={i}>
            <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
              {group.name}
            </h1>
            <div className="logos flex items-center justify-center sm:items-start sm:justify-start flex-wrap gap-4">
              {group.logos.map((logo, i: number) => {
                return (
                  <div className="logo flex items-start justify-center" key={i}>
                    <Image
                      src={folderLocation + logo}
                      width={72}
                      height={100}
                      alt="logo"
                      // className="h-auto w-[80px] lg:w-[50px]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="contact text-white mt-4 flex flex-col w-full gap-4">
        <div className="flex items-center gap-2">
          <Phone className="stroke-white" width={20} />
          <span>+964 7702 444 844</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="stroke-white" width={20} />
          <span>info@oigatech.iq</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            className="icon w-[30px] h-[30px] border-2 rounded-full border-white flex items-center justify-center"
            href="https://www.facebook.com/share/15kykiAxfu/?mibextid=wwXIfr"
            target="_blank"
          >
            <Facebook width={17} />
          </a>
          <a
            className="icon w-[30px] h-[30px] rounded-full flex items-center justify-center"
            href="https://www.instagram.com/oigatech.iq?igsh=enM3YmJqZHVlandp"
            target="_blank"
          >
            <Instagram width={35} className="scale-125" />
          </a>
          <a
            className="icon w-[30px] h-[30px] border-2 rounded-full border-white flex items-center justify-center"
            href="https://iq.linkedin.com/showcase/oigatechiq/"
            target="_blank"
          >
            <Linkedin width={17} />
          </a>
        </div>
      </div>
    </div>
  );
};
