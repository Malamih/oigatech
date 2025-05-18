import { Button } from "./ui/button";
import { DragEvent, useCallback, useRef, useState, useEffect } from "react";
import clsx from "clsx";
import styles from "@/styles/imageInput.module.scss";
import { toast } from "sonner";
import exifr from "exifr";

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
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback(async (file: File) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    const maxSizeInMB = 5;

    if (fileSizeInMB > maxSizeInMB) {
      toast.warning(
        "Image is more than the maximum size (5mb) make sure that your image is less than 5mb to continue."
      );
      return false;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("The selected file is not an image.");
      return false;
    }

    try {
      // قراءة بيانات EXIF
      const exifData = await exifr.parse(file);
      const orientation = exifData?.Orientation || 1;

      // إنشاء عنصر صورة لمعالجة التدوير
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // إنشاء canvas لتطبيق التدوير
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as any;

      // تحديد أبعاد Canvas بناءً على الاتجاه
      if (orientation >= 5 && orientation <= 8) {
        canvas.width = img.naturalHeight;
        canvas.height = img.naturalWidth;
      } else {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      // تطبيق التحويلات بناءً على Orientation
      switch (orientation) {
        case 2:
          ctx.transform(-1, 0, 0, 1, canvas.width, 0);
          break;
        case 3:
          ctx.transform(-1, 0, 0, -1, canvas.width, canvas.height);
          break;
        case 4:
          ctx.transform(1, 0, 0, -1, 0, canvas.height);
          break;
        case 5:
          ctx.transform(0, 1, 1, 0, 0, 0);
          break;
        case 6:
          ctx.transform(0, 1, -1, 0, canvas.height, 0);
          break;
        case 7:
          ctx.transform(0, -1, -1, 0, canvas.height, canvas.width);
          break;
        case 8:
          ctx.transform(0, -1, 1, 0, 0, canvas.width);
          break;
        default:
          break;
      }

      // رسم الصورة مع التصحيح
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      // تحويل Canvas إلى Blob ثم إلى File
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.95)
      );

      if (!blob) throw new Error("Failed to process image");

      const rotatedFile = new File([blob], file.name, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      setFile(rotatedFile);

      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(rotatedFile);
        inputRef.current.files = dataTransfer.files;
      }

      const src = canvas.toDataURL("image/jpeg", 0.95);
      setImageSrc(src);
      URL.revokeObjectURL(img.src);
      return true;
    } catch (error) {
      console.error("Image processing error:", error);
      toast.error("Failed to process image");
      return false;
    }
  }, []);

  const handleDrop = useCallback(
    async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        await processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files = e.target.files;
      if (files && files.length > 0) {
        await processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className="mt-6 flex-[1] flex flex-col sm:flex-row gap-2">
      <input
        type="file"
        name="image"
        id="image"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
        accept="image/*"
      />
      <label
        className={clsx(
          "input w-[220px] m-auto sm:m-0 min-h-[130px] max-h-[200px] overflow-hidden rounded-sm cursor-pointer border-dotted border-2 border-gray-500 flex items-center flex-col gap-2",
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
        {imageSrc ? (
          <div className="relative w-full h-full">
            {/* استبدال Image بـ img عادي */}
            <img
              src={imageSrc}
              alt="uploaded preview"
              className="object-cover w-full h-full hover:opacity-75 transition duration-200"
            />
          </div>
        ) : (
          <div className="py-2 px-6 flex items-center flex-col gap-1">
            {/* استبدال Image بـ img عادي للآيكون */}
            <img src="/upload.png" width={40} height={50} alt="upload icon" />
            <h1 className="text-gray-400 text-center">
              Drag and drop files here
            </h1>
            <h2 className="font-medium text-gray-400">- OR -</h2>
            <Button
              className="rounded-sm bg-gray-600 px-4 py-0 mt-2 cursor-pointer hover:bg-gray-700"
              onClick={handleClick}
              type="button"
            >
              Browse Files
            </Button>
          </div>
        )}
      </label>
      <div className="conditions flex flex-col sm:flex-row gap-2">
        <div className="w-[140px] h-full rounded-sm shadow-xl border border-gray-300 m-auto md:m-0">
          {/* استبدال Image بـ img عادي للصورة التوضيحية */}
          <img
            src="/imageEg.png"
            className="object-cover w-full h-full"
            alt="example"
          />
        </div>
        <div className="list">
          <h1 className="font-medium text-gray-400 text-center md:text-left">
            Conditions for uploading an image:
          </h1>
          <ul>
            {conditions.map((condition, i) => (
              <li
                className="text-gray-400 text-sm font-medium text-center md:text-left"
                key={i}
              >
                {condition}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
