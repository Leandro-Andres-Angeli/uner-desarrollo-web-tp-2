export const imagesLinkToEntityOptions = {
  newImage: ['vincular', 'no vincular'],
  existingImage: ['vincular', 'desvincular'],
};

export const handleLinkToEntityImages = (state) => {
  if (!Boolean(state)) {
    return imagesLinkToEntityOptions.newImage;
  }
  let existingImage = imagesLinkToEntityOptions.existingImage;

  if (state.el.idAloj === null) {
    // const idx = existingImage.findIndex((el) => el === 'desvincular');
    // existingImage.splice(idx, idx + 1);
    return existingImage.filter((el) => el !== 'desvincular');
  }
  return existingImage;
};
