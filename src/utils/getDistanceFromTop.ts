export const getDistanceFromTop = (element: HTMLElement) => {
  let distanceFromTop = 0;
  if (element.offsetParent) {
    do {
      distanceFromTop += element.offsetTop;
      element = element.offsetParent;
    } while (element);
  }

  return distanceFromTop;
};
