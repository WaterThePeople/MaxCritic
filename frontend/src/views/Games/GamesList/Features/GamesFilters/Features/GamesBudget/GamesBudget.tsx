import React, { useState, useEffect } from "react";
import style from "./GamesBudget.module.sass";
import LoadingCard from "components/LoadingCard/LoadingCard";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

function GamesBudget({
  selectedBudget,
  toggleBudget,
}: {
  selectedBudget: string[];
  toggleBudget: Function;
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getBudget = async () => {
    setLoading(true);
    axios
      .get(`${serverPath}/api/games/budgets`, {})
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
    getBudget();
  }, []);

  return (
    <div className={style.container}>
      <span>Budget</span>
      <div className={style.content}>
        {loading ? (
          <LoadingCard classname={style.loading_card} />
        ) : (
          data?.map((item: any, index: number) => (
            <ImageTextRow
              image={item?.image}
              text={item?.budget_name}
              small
              selected={selectedBudget.includes(item?.budget_name)}
              onClick={() => toggleBudget(item?.budget_name)}
              key={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GamesBudget;
