import ImageResizer from "react-image-file-resizer";
export const imageResizer = (file, maxWidth, maxHeight, quality) =>
  new Promise((resolve) => {
    ImageResizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  }).then((resizedImage) => {
    const blob = dataURItoBlob(resizedImage);
    const fileSize = blob.size;
    return { resizedImage, fileSize };
  });

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}
