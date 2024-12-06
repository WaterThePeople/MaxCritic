import React, { useState, useEffect } from "react";
import style from "./MoviesCategories.module.sass";
import LoadingCard from "components/LoadingCard/LoadingCard";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

function MoviesCategories({
  selectedCategories,
  toggleCategory,
}: {
  selectedCategories: string[];
  toggleCategory: Function;
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    setLoading(true);
    axios
      .get(`${serverPath}api/movies/categories`, {})
      .then((response) => {
        setData(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={style.container}>
      <span>Categories</span>
      <div className={style.content}>
        {loading ? (
          <LoadingCard classname={style.loading_card} />
        ) : (
          data?.map((item: any, index: number) => (
            <ImageTextRow
              image={item?.image}
              text={item?.category_name}
              small
              selected={selectedCategories.includes(item?.category_name)}
              onClick={() => toggleCategory(item?.category_name)}
              key={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MoviesCategories;
