import React, { useState, useEffect } from "react";
import style from "./GamesAgeRating.module.sass";
import LoadingCard from "components/LoadingCard/LoadingCard";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

function GamesAgeRating({
  selectedAgeRating,
  toggleAge,
}: {
  selectedAgeRating: string[];
  toggleAge: Function;
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAgeRating = async () => {
    setLoading(true);
    axios
      .get(`${serverPath}api/games/age`, {})
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
    getAgeRating();
  }, []);

  return (
    <div className={style.container}>
      <span>Age Rating</span>
      <div className={style.content}>
        {loading ? (
          <LoadingCard classname={style.loading_card} />
        ) : (
          data?.map((item: any, index: number) => (
            <ImageTextRow
              image={item?.image}
              text={item?.rating_name}
              small
              selected={selectedAgeRating.includes(item?.rating_name)}
              onClick={() => toggleAge(item?.rating_name)}
              key={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GamesAgeRating;
