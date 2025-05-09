import { Content } from "@/components/Content";
import { Intro } from "@/components/Intro";

export default function Home() {
  return (
    <div className="home relative z-[1] mt-6">
      <Intro />
      <Content />
    </div>
  );
}
