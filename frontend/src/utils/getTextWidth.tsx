export const getTextWidth = (text: string, fontSize: number = 16): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = `${fontSize}px Poppins-Regular`;
    return context.measureText(text).width;
  }
  return 0;
};
