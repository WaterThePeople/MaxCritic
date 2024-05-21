import React from "react";

const icons = {
  gamepad:
    "M15.5,8H13V4a1,1,0,0,0-2,0V8H8.5a6.5,6.5,0,0,0,0,13h7a6.5,6.5,0,0,0,0-13ZM10,15.5H9v1a1,1,0,0,1-2,0v-1H6a1,1,0,0,1,0-2H7v-1a1,1,0,0,1,2,0v1h1a1,1,0,0,1,0,2ZM16,17a1,1,0,1,1,1-1A1,1,0,0,1,16,17Zm2-3a1,1,0,1,1,1-1A1,1,0,0,1,18,14Z",
  movie:
    "M39.4574 7.74917L39.5594 8.06847L40.662 11.9135C40.8713 12.6435 40.5018 13.4023 39.8254 13.6996L39.6335 13.7689L18.1797 19.9191L40.4978 19.9209C41.2572 19.9209 41.8848 20.4852 41.9841 21.2174L41.9978 21.4209V38.417C41.9978 41.342 39.7144 43.7338 36.8329 43.9069L36.4978 43.917H11.5001C8.57505 43.917 6.1833 41.6335 6.01015 38.752L6.00011 38.417L5.9997 21.6331L4.95618 17.9908C4.14992 15.179 5.68562 12.2505 8.40781 11.2898L8.72711 11.1878L32.7565 4.29753C35.5682 3.49128 38.4967 5.02698 39.4574 7.74917ZM12.5455 13.2138L9.55403 14.0716C8.30975 14.4284 7.55742 15.6675 7.78183 16.9146L7.83988 17.1639L8.52855 19.5656L9.11872 19.3959L12.5455 13.2138ZM22.0581 10.4861L16.6231 12.0446L13.1964 18.2266L18.6314 16.6682L22.0581 10.4861ZM31.5727 7.75787L26.1377 9.31633L22.711 15.4983L28.144 13.9404L31.5727 7.75787ZM35.2671 7.29076L32.2255 12.7701L37.3626 11.2976L36.6756 8.89538C36.4613 8.14795 35.9286 7.57806 35.2671 7.29076Z",
  tv: "M6.624.334a.75.75 0 00-1.248.832L6.599 3H2.25A2.25 2.25 0 000 5.25v7.5A2.25 2.25 0 002.25 15h11.5A2.25 2.25 0 0016 12.75v-7.5A2.25 2.25 0 0013.75 3H9.401l1.223-1.834A.75.75 0 109.376.334L8 2.398 6.624.334zM7.989 4.5a.798.798 0 00.022 0h5.739a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75h5.739z",
  music:
    "M6 18.573c2.206 0 4-1.794 4-4V4.428L19 7.7v7.43a3.953 3.953 0 0 0-2-.557c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4V7a.998.998 0 0 0-.658-.939l-11-4A.999.999 0 0 0 8 3v8.13a3.953 3.953 0 0 0-2-.557c-2.206 0-4 1.794-4 4s1.794 4 4 4z",
};

interface SvgImagePropsScheme {
  size?: number;
  fill?: string;
  name?: string;
  rotate?: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: any;
}

const Icon = (props: SvgImagePropsScheme) => {
  const size = props.size ? props.size : 25;
  const name = props.name ? props.name : "heart";
  const fill = props.fill ? props.fill : "none";
  const viewBox = props.viewBox ? props.viewBox : "";
  const stroke = props.stroke ? props.stroke : "";
  const strokeWidth = props.strokeWidth ? props.strokeWidth : 2;
  const className = props.className ? props.className : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        className={className}
        d={icons[name as keyof typeof icons]}
        fill={fill}
      />
    </svg>
  );
};

export { Icon };
