import React, { useState, useEffect } from "react";
import style from "./Search.module.sass";
import View from "wrappers/View/View";
import { useLocation } from "react-router-dom";
import SearchBar from "components/SearchBar/SearchBar";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import SearchBarItemFull from "components/SearchBarItemFull/SearchBarItemFull";
import Pagination from "components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import LoadingCard from "components/LoadingCard/LoadingCard";

const pageSize = 10;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);
  const [dataCount, setDataCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const pageParam = params.get("page");
    const searchParam = params.get("q");

    setPage(pageParam ? parseInt(pageParam, 10) : 1);
    setSearch(searchParam ? searchParam : "");

    setIsInitialized(true);
  }, [location.search]);

  const getData = async () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (page) query.set("page", page.toString());
    if (search) query.set("q", search.toString());
    axios
      .get(
        `${serverPath}/api/search/?${query.toString()}&page_size=${pageSize}`,
        {}
      )
      .then((response) => {
        setData(response?.data?.results);
        setDataCount(response?.data?.count);
        setLoading(false);
      })
      .catch((error) => {
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isInitialized) {
      getData();
    }
  }, [isInitialized, page]);

  const updateUrl = (
    updatedParams: Partial<Record<string, string | number | null>>
  ) => {
    const params = new URLSearchParams(location.search);

    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value || value === 0) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    navigate(`?${params.toString()}`, { replace: false });
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    updateUrl({ page: newPage });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (isInitialized) {
        setPage(1);
        updateUrl({ q: search, page: 1 });
        getData();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <View background>
      <div className={style.content}>
        <div className={style.title}>Search through our website.</div>
        <SearchBar setValue={setSearch} value={search} />
        <div className={style.separator} />
        <div className={style.container}>
          {loading
            ? [...Array(pageSize)]?.map((item: any, index: number) => (
                <LoadingCard classname={style.loading_card} key={index} />
              ))
            : data?.map((item: any, index: number) => (
                <div className={style.column} key={index}>
                  <SearchBarItemFull
                    name={item?.name}
                    image={item?.image}
                    date={item?.release_date}
                    slug={item?.slug}
                    type={item?.type}
                  />
                  {index != data?.length - 1 && (
                    <div className={style.separator} />
                  )}
                </div>
              ))}
        </div>
        {!(data?.length > 0) && (
          <div className={style.empty}>We couldn't find anything!</div>
        )}
        {!loading && (
          <Pagination
            amount={dataCount}
            currentPage={page}
            changePage={(x: any) => changePage(x)}
            pageSize={pageSize}
          />
        )}
      </div>
    </View>
  );
}

export default Search;
