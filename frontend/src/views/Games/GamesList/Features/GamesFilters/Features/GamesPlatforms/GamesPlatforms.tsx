import React, { useState, useEffect } from "react";
import style from "./GamesPlatforms.module.sass";
import LoadingCard from "components/LoadingCard/LoadingCard";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

function GamesPlatforms({
  selectedPlatforms,
  togglePlatforms,
}: {
  selectedPlatforms: string[];
  togglePlatforms: Function;
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getPlatforms = async () => {
    setLoading(true);
    axios
      .get(`${serverPath}/api/games/platforms`, {})
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
    getPlatforms();
  }, []);

  return (
    <div className={style.container}>
      <span>Platforms</span>
      <div className={style.content}>
        {loading ? (
          <LoadingCard classname={style.loading_card} />
        ) : (
          data?.map((item: any, index: number) => (
            <ImageTextRow
              image={item?.image}
              text={item?.platform_name}
              small
              selected={selectedPlatforms.includes(item?.platform_name)}
              onClick={() => togglePlatforms(item?.platform_name)}
              key={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GamesPlatforms;
