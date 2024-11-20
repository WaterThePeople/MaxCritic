import style from "./GamesOrders.module.sass";
import DropdownModal from "components/DropdownModal/DropdownModal";
import DoubleRangeSlider from "components/DoubleRangeSlider/DoubleRangeSlider";

function GamesOrders({
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
          rightValue={maxYear}
          valueChange={yearChange}
          classname={style.slider}
          min={oldestYear}
          max={newestYear}
        />
      </div>
      <div className={style.content}>
        <span>Order by</span>
        <DropdownModal array={array} value={current} onClick={changeOrder} />
      </div>
    </div>
  );
}

export default GamesOrders;
