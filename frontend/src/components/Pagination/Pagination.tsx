import React, { useState, useEffect } from "react";
import style from "./Pagination.module.sass";
import { Icon } from "components/Icon/Icon";
import cn from "classnames";

function Pagination({
  amount,
  currentPage,
  changePage,
  pageSize,
}: {
  amount: number;
  currentPage: number;
  changePage: Function;
  pageSize: number;
}) {
  const pages = Math.ceil(amount / pageSize);

  const [manyPages, setManyPages] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (currentPage === 1) {
      setManyPages([currentPage, currentPage + 1, currentPage + 2, pages]);
    } else if (currentPage === pages) {
      setManyPages([1, currentPage - 2, currentPage - 1, currentPage]);
    } else if (currentPage == 2) {
      setManyPages([
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        pages,
      ]);
    } else if (currentPage == pages - 1) {
      setManyPages([
        1,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ]);
    } else {
      setManyPages([1, currentPage - 1, currentPage, currentPage + 1, pages]);
    }
  }, [currentPage]);

  return (
    <div className={style.container}>
      {currentPage > 1 && (
        <button
          className={style.arrow}
          onClick={() => changePage(currentPage - 1)}
        >
          <Icon
            name={"basic_arrow"}
            className={style.svg}
            viewBox="4 4 24 24"
            rotate="90deg"
          />
        </button>
      )}
      {pages <= 5
        ? [...Array(pages)].map((item, index) => (
            <button
              className={cn(
                style.page_button,
                currentPage === index + 1 && style.current
              )}
              key={index}
              onClick={() => changePage(index + 1)}
            >
              <div className={style.text}>{index + 1}</div>
            </button>
          ))
        : [...Array(manyPages.length)].map((item, index) => (
            <div key={index} className={style.buttons}>
              <button
                className={cn(
                  style.page_button,
                  currentPage === manyPages[index] && style.current
                )}
                onClick={() => changePage(manyPages[index])}
              >
                <div className={style.text}>{manyPages[index]}</div>
              </button>
              {index === 2 && currentPage === 1 && (
                <div className={style.dots}>. . .</div>
              )}
              {index === 3 && currentPage === 2 && (
                <div className={style.dots}>. . .</div>
              )}
              {index === 3 && currentPage === 3 && (
                <div className={style.dots}>. . .</div>
              )}
              {index === 0 && currentPage === pages - 1 && (
                <div className={style.dots}>. . .</div>
              )}
              {index === 0 && currentPage === pages - 2 && (
                <div className={style.dots}>. . .</div>
              )}
              {index === 0 && currentPage === pages && (
                <div className={style.dots}>. . .</div>
              )}
              {index === 0 && currentPage > 3 && currentPage < pages - 2 && (
                <div className={style.dots}>. . .</div>
              )}
              {index === 3 && currentPage > 3 && currentPage < pages - 2 && (
                <div className={style.dots}>. . .</div>
              )}
            </div>
          ))}
      {currentPage < pages && (
        <button
          className={style.arrow}
          onClick={() => changePage(currentPage + 1)}
        >
          <Icon
            name={"basic_arrow"}
            className={style.svg}
            viewBox="4 4 24 24"
            rotate="270deg"
          />
        </button>
      )}
    </div>
  );
}

export default Pagination;
