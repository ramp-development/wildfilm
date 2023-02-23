/**
 * Watches the given images and runs a callback once they're loaded
 * @param toCheck The image or images to track load progress, defaulting to all images within the document
 * @param callback The function to run once all image have loaded
 */

export const imagesLoaded = (
  toCheck: null | HTMLImageElement | HTMLImageElement[],
  callback: () => void
) => {
  if (!toCheck) toCheck = [...document.querySelectorAll('img')];
  if (!Array.isArray(toCheck)) toCheck = [...toCheck];

  const numberOfImages = toCheck.length;
  let numberLoaded = 0;

  toCheck.forEach((image) => {
    const tempImage = new Image();
    tempImage.src = image.src;
    tempImage.onload = function () {
      numberLoaded += 1;
      if (numberLoaded === numberOfImages) callback();
    };
  });
};
