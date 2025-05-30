import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export const Sponsors = () => {
  const folderLocation = "/sponsers";
  return (
    <div
      className="sponsors overflow-hidden my-3 flex flex-wrap gap-4 px-4 py-4 self-center max-w-[700px] lg:max-w-[400px] w-full rounded-tr-2xl rounded-br-2xl rounded-tl-2xl rounded-bl-2xl lg:rounded-tl-[0] lg:rounded-bl-[0]"
      style={{ background: "linear-gradient(to bottom, #EA4C29, #F6AD20)" }}
    >
      <div className="group w-full sm:w-[calc(50%-16px)]">
        <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
          Sponsored By
        </h1>
        <div className="logos flex items-center justify-center sm:items-start sm:justify-start flex-wrap gap-4">
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/1.png"}
              width={60}
              height={100}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="group w-full sm:w-[calc(50%-16px)]">
        <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
          In association with
        </h1>
        <div className="logos flex items-center justify-center sm:items-start sm:justify-start flex-wrap gap-4">
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/2.png"}
              width={80}
              height={100}
              alt="logo"
            />
          </div>
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/3.png"}
              width={60}
              height={100}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="group w-full sm:w-[calc(50%-16px)]">
        <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
          Host Venue
        </h1>
        <div className="logos flex items-center justify-center sm:items-start sm:justify-start flex-wrap gap-4">
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/6.png"}
              width={60}
              height={100}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="group w-full sm:w-[calc(50%-16px)]">
        <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
          Organized By
        </h1>
        <div className="logos flex items-center justify-center sm:items-start sm:justify-start flex-wrap gap-4">
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/8-1.png"}
              width={70}
              height={100}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="group w-full sm:w-[calc(50%-16px)]">
        <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
          ISO Certificate
        </h1>
        <div className="logos flex flex-col items-center justify-center sm:items-start sm:justify-start flex-wrap gap-1">
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/8.png"}
              width={70}
              height={100}
              alt="logo"
            />
          </div>
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/9.png"}
              width={70}
              height={100}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="group w-full sm:w-[calc(50%-16px)]">
        <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
          Member of
        </h1>
        <div className="logos flex items-center justify-center sm:items-start sm:justify-start flex-wrap gap-2">
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/10.png"}
              width={50}
              height={100}
              alt="logo"
            />
          </div>
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/11.png"}
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="logo flex items-start justify-center">
              <img
                src={folderLocation + "/12.png"}
                width={80}
                height={100}
                alt="logo"
              />
            </div>
            <div className="logo flex items-start justify-center -translate-y-2">
              <img
                src={folderLocation + "/13.png"}
                width={80}
                height={100}
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="group w-full sm:w-[calc(50%-16px)] mt-2">
        <h1 className="font-medium text-white mb-2 text-lg text-center sm:text-left">
          Co-Organizer
        </h1>
        <div className="logos flex flex-col items-center justify-center sm:items-start sm:justify-start flex-wrap gap-1">
          <div className="logo flex items-start justify-center">
            <img
              src={folderLocation + "/7.png"}
              width={70}
              height={100}
              alt="logo"
            />
          </div>
        </div>
      </div>
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
