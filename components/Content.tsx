"use client";
import { useRouter } from "next/navigation";
import { ImageInput } from "./ImageInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export const Content = () => {
  const router = useRouter();
  const register = () => {
    console.log("registering");
  };
  return (
    <>
      <form action={register} className="flex flex-col">
        <div className="group flex flex-col sm:flex-row gap-4 justify-between">
          <Input placeholder="First name" name="first_name" />
          <Input placeholder="Last name" name="last_name" />
        </div>
        <div className="group flex flex-col sm:flex-row gap-4 justify-between mt-4">
          <div className="w-full mt-2">
            <Input placeholder="Phone number" name="phoneNumber" />
            <h1 className="font-normal text-gray-500 mb-2 mt-2">
              Send badge via
            </h1>
            <RadioGroup
              name="sendVia"
              className="grid mt-2"
              style={{ gridTemplateColumns: "repeat(2, minmax(auto, 1fr)" }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp">Whatsapp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="participationType w-full mt-2">
            <h1 className="font-normal text-gray-500 mb-2">
              Participation type
            </h1>
            <RadioGroup
              name="participationType"
              style={{ gridTemplateColumns: "repeat(2, minmax(auto, 1fr)" }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exhibitor" id="exhibitor" />
                <Label htmlFor="exhibitor">Exhibitor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organizer" id="organizer" />
                <Label htmlFor="organizer">Organizer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="press" id="press" />
                <Label htmlFor="press">Press</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visitor" id="visitor" />
                <Label htmlFor="visitor">Visitor</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="group flex flex-col sm:flex-row gap-4 justify-between mt-4">
          <Input placeholder="Company name" name="company_name" />
          <Input placeholder="Your position" name="position" />
        </div>
        <Input
          placeholder="Your email"
          name="email"
          className="w-full sm:w-2/4 mt-4"
        />
        <ImageInput />
        <div className="options mt-4 flex gap-4">
          <Button className="py-2 px-6 rounded-full text-lg cursor-pointer">
            Register Badge
          </Button>
          <Button
            className="py-2 px-6 rounded-full text-lg underline cursor-pointer"
            variant={"ghost"}
            onClick={() => router.refresh()}
          >
            Clear All
          </Button>
        </div>
      </form>
    </>
  );
};
