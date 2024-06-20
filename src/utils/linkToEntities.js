export const imagesLinkToEntityOptions = {
  newImage: ['vincular', 'no vincular'],
  existingImage: ['vincular', 'desvincular'],
};

export const handleLinkToEntityImages = (state) => {
  if (!Boolean(state)) {
    return imagesLinkToEntityOptions.newImage;
  }
  return imagesLinkToEntityOptions.existingImage;
};
