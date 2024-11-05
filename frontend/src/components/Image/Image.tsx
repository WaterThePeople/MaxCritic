import React from "react";

function Image({ classname, image }: { classname?: string; image?: string }) {
  return (
    image ? (
      <img
        src={`data:image/jpeg;base64,${image}`}
        alt="Game"
        className={classname}
      />
    ) : (
      <div className={classname}/>
    )
  );
}

export default Image;
