export const useReadImage = (file: File) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        resolve(event.target.result);
      } else {
        reject(new Error("FileReader event target is null"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
