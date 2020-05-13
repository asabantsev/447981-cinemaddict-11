export const onEscKeyDown = (evt) => {
  const isEscKey = evt.key === `Escape` || `Esc`;
  const filmDetails = document.querySelector(`.film-details`);

  if (isEscKey) {
    filmDetails.remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};
