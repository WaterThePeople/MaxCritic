import React, { useState, useEffect } from "react";
import style from "./GamesOrders.module.sass";
import DropdownModal from "components/DropdownModal/DropdownModal";
import DoubleRangeSlider from "components/DoubleRangeSlider/DoubleRangeSlider";
import LoadingCard from "components/LoadingCard/LoadingCard";

function GamesOrders({
  array,
  current,
  setCurrent,
  oldestYear,
  newestYear,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
}: {
  array: string[];
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
  oldestYear: number;
  newestYear: number;
  minYear: number;
  setMinYear: React.Dispatch<React.SetStateAction<number>>;
  maxYear: number;
  setMaxYear: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={style.container}>
      <div className={style.slider_container}>
        <span>
          Release year from {minYear} to {maxYear}
        </span>
        <div className={style.text_row}>
          <span>{oldestYear}</span>
          <span>{newestYear}</span>
        </div>
        <DoubleRangeSlider
          leftValue={minYear}
          setLeftValue={setMinYear}
          rightValue={maxYear}
          setRightValue={setMaxYear}
          classname={style.slider}
          min={oldestYear}
          max={newestYear}
        />
      </div>
      <div className={style.content}>
        <span>Order by</span>
        <DropdownModal
          array={array}
          value={current}
          onClick={(x: string) => setCurrent(x)}
        />
      </div>
    </div>
  );
}

export default GamesOrders;
