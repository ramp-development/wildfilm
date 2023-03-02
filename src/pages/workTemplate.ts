export const workTemplate = () => {
  const { referrer } = document,
    hide = referrer.endsWith('/work') ? 'other' : 'work',
    toHide = [...document.querySelectorAll(`[data-from="${hide}"]`)];

  toHide.forEach((item) => {
    item.style.display = 'none';
  });
};
