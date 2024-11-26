import { useState, useEffect } from "react";
import style from "./DoubleRangeSlider.module.sass";
import cn from "classnames";

function DoubleRangeSlider({
  leftValue,
  rightValue,
  valueChange,
  min = 0,
  max = 100,
  classname,
  minVariable,
  setMinVariable,
  maxVariable,
  setMaxVariable,
}: {
  leftValue: number;
  rightValue: number;
  valueChange: Function;
  min?: number;
  max?: number;
  classname?: string;
  minVariable: number;
  setMinVariable: React.Dispatch<React.SetStateAction<number>>;
  maxVariable: number;
  setMaxVariable: React.Dispatch<React.SetStateAction<number>>;
}) {
  const onLeftChange = (event: any) => {
    let value = parseInt(event.target.value);
    if (value <= rightValue) {
      setMinVariable(value);
    }
  };

  const onRightChange = (event: any) => {
    let value = parseInt(event.target.value);
    if (value >= leftValue) {
      setMaxVariable(value);
    }
  };

  useEffect(() => {
    if (minVariable != leftValue) {
      const timeoutId = setTimeout(() => {
        valueChange(minVariable, maxVariable);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [minVariable]);

  useEffect(() => {
    if (maxVariable != rightValue) {
      const timeoutId = setTimeout(() => {
        valueChange(minVariable, maxVariable);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [maxVariable]);

  return (
    <div className={cn(style.container, classname)}>
      <input
        draggable={false}
        type="range"
        min={min}
        max={max}
        value={minVariable}
        onChange={(e) => onLeftChange(e)}
        className={cn(style.left_input, style.input)}
        id="input_left"
        step={1}
        style={{ zIndex: minVariable > min + (max - min) / 2 ? 6 : 4 }}
      />
      <div
        className={style.bar}
        style={{
          width: `${
            Math.abs((maxVariable - minVariable) / (max - min)) * 100
          }%`,
          left: `${((minVariable - min) / (max - min)) * 100}%`,
          right: `${((max - maxVariable) / (max - min)) * 100}%`,
        }}
      />
      <input
        draggable={false}
        type="range"
        min={min}
        max={max}
        value={maxVariable}
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
