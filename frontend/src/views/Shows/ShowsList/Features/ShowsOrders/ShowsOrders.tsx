import { useState } from "react";
import style from "./ShowsOrders.module.sass";
import DropdownModal from "components/DropdownModal/DropdownModal";
import DoubleRangeSlider from "components/DoubleRangeSlider/DoubleRangeSlider";

function ShowsOrders({
  array,
  current,
  changeOrder,
  oldestYear,
  newestYear,
  minYear,
  maxYear,
  yearChange,
}: {
  array: any[];
  current: string;
  changeOrder: Function;
  oldestYear: number;
  newestYear: number;
  minYear: number;
  maxYear: number;
  yearChange: Function;
}) {
  const [minYearVariable, setMinYearVariable] = useState(minYear);
  const [maxYearVariable, setMaxYearVariable] = useState(maxYear);
  return (
    <div className={style.container}>
      <div className={style.slider_container}>
        <span>
          Release year from {minYearVariable} to {maxYearVariable}
        </span>
        <div className={style.text_row}>
          <span>{oldestYear}</span>
          <span>{newestYear}</span>
        </div>
        <DoubleRangeSlider
          leftValue={minYear}
          rightValue={maxYear}
          valueChange={yearChange}
          classname={style.slider}
          min={oldestYear}
          max={newestYear}
          minVariable={minYearVariable}
          setMinVariable={setMinYearVariable}
          maxVariable={maxYearVariable}
          setMaxVariable={setMaxYearVariable}
        />
      </div>
      <div className={style.content}>
        <span>Order by</span>
        <DropdownModal array={array} value={current} onClick={changeOrder} />
      </div>
    </div>
  );
}

export default ShowsOrders;
