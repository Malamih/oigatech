import Image from "next/image";
import { Button } from "./ui/button";
import { DragEvent, useCallback, useRef, useState } from "react";
import clsx from "clsx";
import styles from "@/styles/imageInput.module.scss";
import { XIcon } from "lucide-react";
import { useReadImage } from "@/lib/imageReader";
import { toast } from "sonner";

const conditions = [
  "High Lighting",
  "High Quality",
  "Image with white background",
  "A photo of the person provided exclusively",
  "File Type: JPg, Png",
  "File size maximum: 5MB",
];

export const ImageInput = ({ isError = false }: { isError: boolean }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleDragEnter = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (!files[0].type.startsWith("image/")) {
        toast.error("The selected file is not an image.");
        return;
      }
      setFile(files[0]);
      const src = await useReadImage(files[0]);
      if (!imageRef.current) return;
      imageRef.current.src = src as string;
    }
  }, []);

  const handleChange = useCallback(async (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      if (!files[0].type.startsWith("image/")) {
        toast.error("The selected file is not an image.");
        return;
      }
      setFile(files[0]);
      const src = await useReadImage(files[0]);
      if (!imageRef.current) return;
      imageRef.current.src = src as string;
    }
  }, []);

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-2">
      <input
        type="file"
        name="image"
        id="image"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
      />
      <label
        className={clsx(
          "input w-[200px] m-auto sm:m-0 min-h-[130px] overflow-hidden rounded-sm cursor-pointer border-dotted border-2 border-gray-500 flex items-center flex-col gap-2",
          {
            [styles.dragActive]: isDragging,
            [styles.error]: isError,
          }
        )}
        htmlFor="image"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="image relative w-full h-full bg-black">
            <img
              src={"/upload.png"}
              alt="upload icon"
              className="object-cover w-full h-full absolute top-0 left-0 hover:opacity-75 transition duration-200"
              ref={imageRef}
            />
          </div>
        ) : (
          <div className="py-2 px-4 flex items-center flex-col">
            <Image
              src={"/upload.png"}
              width={40}
              height={50}
              alt="upload icon"
            />
            <h1 className="text-gray-400 text-center">
              Drag and drop files here
            </h1>
            <h2 className="font-medium text-gray-400">- OR -</h2>
            <Button
              className="rounded-xs bg-gray-800 px-4 py-0 mt-2 cursor-pointer hover:bg-gray-700"
              onClick={handleClick}
              type="button"
            >
              Browse Files
            </Button>
          </div>
        )}
      </label>
      <div className="conditions flex flex-col sm:flex-row gap-2">
        <Image
          src={"/imageEg.png"}
          className="w-[120px] h-auto object-cover"
          alt="eg"
          width={120}
          height={100}
        />
        <div className="list">
          <h1 className="font-medium text-gray-400 text-center md:text-left">
            Conditions for uploading an image:
          </h1>
          {conditions.map((condition, i: number) => {
            return (
              <li
                className="text-gray-400 text-sm font-medium text-center md:text-left"
                key={i}
              >
                {condition}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};
