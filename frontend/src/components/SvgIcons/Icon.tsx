import React from "react";

const icons = {
  gamepad:
    "M15.5,8H13V4a1,1,0,0,0-2,0V8H8.5a6.5,6.5,0,0,0,0,13h7a6.5,6.5,0,0,0,0-13ZM10,15.5H9v1a1,1,0,0,1-2,0v-1H6a1,1,0,0,1,0-2H7v-1a1,1,0,0,1,2,0v1h1a1,1,0,0,1,0,2ZM16,17a1,1,0,1,1,1-1A1,1,0,0,1,16,17Zm2-3a1,1,0,1,1,1-1A1,1,0,0,1,18,14Z",
  
  };

interface SvgImagePropsScheme {
  size?: number;
  fill?: string;
  name?: string;
  rotate?: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
}

const Icon = (props: SvgImagePropsScheme) => {
  const size = props.size ? props.size : 25;
  const name = props.name ? props.name : "heart";
  const fill = props.fill ? props.fill : "none";
  const viewBox = props.viewBox ? props.viewBox : "";
  const stroke = props.stroke ? props.stroke : "";
  const strokeWidth = props.strokeWidth ? props.strokeWidth : 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path d={icons[name as keyof typeof icons]} fill={fill} />
    </svg>
  );
};

export { Icon };
