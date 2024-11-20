import React, { useState, useEffect } from "react";
import style from "./DropdownModal.module.sass";
import { Icon } from "components/Icon/Icon";
import cn from "classnames";
import useWindowDimensions from "utils/useWindowDimensions";
import { getTextWidth } from "utils/getTextWidth";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";

function DropdownModal({
  value,
  onClick,
  array,
}: {
  value: string;
  onClick: Function;
  array: any[];
}) {
  const [visible, setVisible] = useState(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const { width } = useWindowDimensions();

  const onSelect = (item: string) => {
    onClick(item);
    setVisible(false);
  };

  useEffect(() => {
    const x = Math.max(
      ...array.map((text) => getTextWidth(text, width > 1000 ? 16 : 12))
    );
    let temp = x + 64;
    setModalWidth(temp);
  }, [array, width]);

  return (
    <OutsideClickHandler onClickOutside={() => setVisible(false)}>
      <div className={style.container} style={{ width: `${modalWidth}px` }}>
        <button
          className={cn(style.button, style.top, visible && style.visible)}
          onClick={() => setVisible(!visible)}
        >
          <div className={style.text}>{value}</div>
          <Icon
            name={"basic_arrow"}
            className={style.arrow}
            viewBox="4 4 24 24"
            rotate={visible ? "180deg" : "0deg"}
          />
        </button>
        {visible && (
          <div className={style.modal}>
            {array.map((item, index) => (
              <button
                className={cn(
                  style.button,
                  style.item,
                  index + 1 === array?.length && style.last
                )}
                key={index}
                onClick={() => onSelect(item?.value)}
              >
                <div className={style.text}>{item?.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default DropdownModal;
