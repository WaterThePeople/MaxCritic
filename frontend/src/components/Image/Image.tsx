import React from "react";

function Image({ classname, image }: { classname?: string; image?: string }) {
  return image ? (
    <img
      src={`data:image/jpeg;base64,${image}`}
      alt="Game"
      className={classname}
    />
  ) : (
    <img
      className={classname}
      src={process.env.PUBLIC_URL + "../assets/placeholder_image.png"}
      alt="Placeholder"
    />
  );
}

export default Image;
