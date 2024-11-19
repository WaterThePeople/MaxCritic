import React from "react";
import style from "./DoubleRangeSlider.module.sass";
import cn from "classnames";

function DoubleRangeSlider({
  leftValue,
  rightValue,
  setLeftValue,
  setRightValue,
  min = 0,
  max = 100,
  classname,
}: {
  leftValue: number;
  rightValue: number;
  setLeftValue: React.Dispatch<React.SetStateAction<number>>;
  setRightValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
  classname?: string;
}) {
  const onLeftChange = (event: any) => {
    let value = parseInt(event.target.value);
    if (value <= rightValue) {
      setLeftValue(value);
    }
  };

  const onRightChange = (event: any) => {
    let value = parseInt(event.target.value);
    if (value >= leftValue) {
      setRightValue(value);
    }
  };

  return (
    <div className={cn(style.container, classname)}>
      <input
        draggable={false}
        type="range"
        min={min}
        max={max}
        value={leftValue}
        onChange={(e) => onLeftChange(e)}
        className={cn(style.left_input, style.input)}
        id="input_left"
        step={1}
        style={{ zIndex: leftValue > min + (max - min) / 2 ? 6 : 4 }}
      />
      <div
        className={style.bar}
        style={{
          width: `${Math.abs((rightValue - leftValue) / (max - min)) * 100}%`,
          left: `${((leftValue - min) / (max - min)) * 100}%`,
          right: `${((max - rightValue) / (max - min)) * 100}%`,
        }}
      />
      <input
        draggable={false}
        type="range"
        min={min}
        max={max}
        value={rightValue}
        onChange={(e) => onRightChange(e)}
        className={cn(style.right_input, style.input)}
        id="input_right"
        step={1}
        style={{ zIndex: 5 }}
      />
    </div>
  );
}

export default DoubleRangeSlider;
