import React, { useState, useEffect } from "react";
import style from "./NavbarSearch.module.sass";
import SearchBar from "components/SearchBar/SearchBar";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import LoadingCard from "components/LoadingCard/LoadingCard";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";
import SearchBarItem from "components/SearchBarItem/SearchBarItem";
import DefaultButton from "components/DefaultButton/DefaultButton";
import { useLocation } from "react-router-dom";
import useWindowDimensions from "utils/useWindowDimensions";
import cn from "classnames";
import { Icon } from "components/Icon/Icon";
import Modal from "components/Modal/Modal";
import { useNavigate } from "react-router-dom";

function NavbarSearch({}: {}) {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const location = useLocation();
  const [visibleModal, setVisibleModal] = useState(false);

  const getData = async () => {
    setLoading(true);
    axios
      .get(`${serverPath}/api/search/?q=${searchBar}&page=1&page_size=3`, {})
      .then((response) => {
        setData(response?.data?.results);
        setLoading(false);
      })
      .catch((error) => {
        setData([]);
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchBar.length > 0) {
        getData();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchBar]);

  useEffect(() => {
    setSearchBar("");
    setOpen(false);
    setVisibleModal(false);
    setData([]);
  }, [location]);

  const handleNavigate = () => {
    const queryParams = new URLSearchParams({
      q: searchBar,
      page: "1",
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  return width > 1000 ? (
    <OutsideClickHandler
      classname={style.container}
      onClickOutside={() => setOpen(false)}
    >
      <SearchBar
        value={searchBar}
        setValue={setSearchBar}
        open={open}
        setOpen={setOpen}
      />
      {searchBar.length > 0 &&
        open &&
        (loading ? (
          <div className={style.open}>
            <LoadingCard classname={style.loading} />
          </div>
        ) : (
          <div className={style.open}>
            {data?.map((item: any, index: number) => (
              <div className={style.column} key={index}>
                <SearchBarItem
                  name={item?.name}
                  image={item?.image}
                  date={item?.date}
                  score={item?.score}
                  slug={item?.slug}
                  type={item?.type}
                />
                <div className={style.separator} />
              </div>
            ))}
            {!(data?.length > 0) && (
              <div className={style.empty}>We couldn't find anything!</div>
            )}
            <DefaultButton onClick={handleNavigate} text="More Options" />
          </div>
        ))}
    </OutsideClickHandler>
  ) : (
    <div className={style.mobile_container}>
      <div
        className={cn(style.mobile_button, open && style.open)}
        onClick={() => setVisibleModal(true)}
      >
        <div className={style.text}>Search...</div>
        <Icon name={"search"} className={style.svg} viewBox="0 0 32 32" />
      </div>
      <Modal setVisible={setVisibleModal} visible={visibleModal}>
        <div className={style.modal}>
          <div className={style.text_mobile}>Search...</div>
          <SearchBar value={searchBar} setValue={setSearchBar} />
          {searchBar.length > 0 &&
            (loading ? (
              <div className={style.mobile_content}>
                <LoadingCard classname={style.loading} />
              </div>
            ) : (
              <div className={style.mobile_content}>
                {data?.map((item: any, index: number) => (
                  <div className={style.column} key={index}>
                    <SearchBarItem
                      name={item?.name}
                      image={item?.image}
                      date={item?.date}
                      score={item?.score}
                      slug={item?.slug}
                      type={item?.type}
                    />
                    <div className={style.separator} />
                  </div>
                ))}
                {!(data?.length > 0) && (
                  <div className={style.empty}>We couldn't find anything!</div>
                )}
                <DefaultButton onClick={handleNavigate} text="More Options" />
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}

export default NavbarSearch;
