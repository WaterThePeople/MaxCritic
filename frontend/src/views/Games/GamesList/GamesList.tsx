import React, { useState, useEffect } from "react";
import style from "./GamesList.module.sass";
import View from "wrappers/View/View";

import GamesFilters from "./GamesFilters/GameFilters";
import GamesOrders from "./GamesOrders/GamesOrders";
import GamesListView from "./GamesListView/GamesListView";

import axios from "axios";
import { serverPath } from "BackendServerPath";

import useWindowDimensions from "utils/useWindowDimensions";
import Pagination from "components/Pagination/Pagination";

import { useNavigate, useLocation } from "react-router-dom";

const orders = [
  {
    name: "Highest score",
    value: "-average_score",
  },
  {
    name: "Lowest score",
    value: "average_score",
  },
  {
    name: "Oldest",
    value: "release_date",
  },
  {
    name: "Newest",
    value: "-release_date",
  },
];

const oldestYear = 1990;
const newestYear = 2030;

function GamesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const pageSize = 8;
  const { width } = useWindowDimensions();
  const [dataMounted, setDataMounted] = useState(false);

  const params = new URLSearchParams(location.search);

  const initialPage = parseInt(params.get("page") || "1");
  const initialOrder =
    orders.find((order) => order.value === params.get("ordering"))?.name ||
    orders[0]?.name;
  const startingYear = parseInt(params.get("year1") || oldestYear.toString());
  const endYear = parseInt(params.get("year2") || newestYear.toString());

  const [page, setPage] = useState<number>(initialPage);
  const [currentOrder, setCurrentOrder] = useState(initialOrder);
  const [minYear, setMinYear] = useState<number>(startingYear);
  const [maxYear, setMaxYear] = useState<number>(endYear);

  const query = `?page=${page}&ordering=${
    orders.find((order) => order.name === currentOrder)?.value
  }&year1=${minYear}&year2=${maxYear}`;

  const getGamesData = async () => {
    setLoading(true);
    axios
      .get(`${serverPath}/api/games/list${query}&page_size=${pageSize}`, {})
      .then((response) => {
        setData(response?.data?.results);
        setDataCount(response?.data?.count);
        setLoading(false);
        setDataMounted(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getGamesData();
  }, []);

  useEffect(() => {
    getGamesData();
  }, [page, currentOrder]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (dataMounted) {
        setPage(1);
        getGamesData();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [minYear, maxYear]);

  useEffect(() => {
    navigate(query, { replace: true });
  }, [page, currentOrder, minYear, maxYear, navigate]);

  return (
    <View>
      <div className={style.content}>
        <div className={style.title}>List of Games</div>
        <div className={style.separator} />
        <div className={style.container}>
          {width > 1000 && <GamesFilters />}
          <div className={style.column}>
            {!loading && (
              <GamesOrders
                array={orders.map((order) => order.name)}
                current={currentOrder}
                setCurrent={setCurrentOrder}
                oldestYear={oldestYear}
                newestYear={newestYear}
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
              />
            )}
            <GamesListView data={data} loading={loading} pageSize={pageSize} />
            {!loading && (
              <Pagination
                amount={dataCount}
                currentPage={page}
                setCurrentPage={setPage}
                pageSize={pageSize}
              />
            )}
          </div>
        </div>
      </div>
    </View>
  );
}

export default GamesList;
