import React, { useState, useEffect } from "react";
import style from "./ApiTestView.module.sass";
import axios from "axios";

function ApiTestView() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("/api/items/")
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.title}>THIS VIEW IS FOR TESTING API CALLS ONLY</div>
      <div className={style.items_container}>
        {data.map((item, index) => (
          <div className={style.item} key={index}>
            {item?.id}
            {item?.title}
            {item?.description}
            {item?.completed}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiTestView;
