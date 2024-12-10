import { useState, useEffect } from "react";
import style from "./GamesList.module.sass";
import View from "wrappers/View/View";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Modal from "components/Modal/Modal";
import GamesFilters from "./Features/GamesFilters/GameFilters";
import GamesOrders from "./Features/GamesOrders/GamesOrders";
import GamesListView from "./Features/GamesListView/GamesListView";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import useWindowDimensions from "utils/useWindowDimensions";
import Pagination from "components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { returnAccessToken } from "utils/Authentication";

const orders = [
  { name: "Highest score", value: "-average_score" },
  { name: "Lowest score", value: "average_score" },
  { name: "Oldest", value: "release_date" },
  { name: "Newest", value: "-release_date" },
];

const oldestYear = 1995;
const newestYear = 2024;

const pageSize = 10;

function GamesList() {
  const { width } = useWindowDimensions();
  const [filtersMobileModal, setFiltersMobileModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState<any[]>([]);
  const [dataCount, setDataCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [ordering, setOrdering] = useState<string>(orders[0].value);
  const [startingYear, setStartingYear] = useState<number>(oldestYear);
  const [endYear, setEndYear] = useState<number>(newestYear);
  const [categories, setCategories] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const pageParam = params.get("page");
    const orderingParam = params.get("ordering");
    const startingYearParam = params.get("year1");
    const endYearParam = params.get("year2");
    const categoriesParam = params.get("categories");
    const platformsParam = params.get("platforms");
    const budgetParam = params.get("budget");
    const ageParam = params.get("age");

    setPage(pageParam ? parseInt(pageParam, 10) : 1);
    setOrdering(orderingParam || orders[0].value);
    setStartingYear(
      startingYearParam ? parseInt(startingYearParam, 10) : oldestYear
    );
    setEndYear(endYearParam ? parseInt(endYearParam, 10) : newestYear);
    setCategories(categoriesParam ? categoriesParam.split(",") : []);
    setPlatforms(platformsParam ? platformsParam.split(",") : []);
    setBudget(budgetParam ? budgetParam.split(",") : []);
    setAge(ageParam ? ageParam.split(",") : []);

    setIsInitialized(true);
  }, [location.search]);

  const getGamesData = async () => {
    const { accessToken } = await returnAccessToken();
    setLoading(true);
    const query = new URLSearchParams();

    if (page) query.set("page", page.toString());
    if (ordering) query.set("ordering", ordering);
    if (startingYear) query.set("year1", startingYear.toString());
    if (endYear) query.set("year2", endYear.toString());
    if (categories.length > 0) query.set("categories", categories.join(","));
    if (platforms.length > 0) query.set("platforms", platforms.join(","));
    if (budget.length > 0) query.set("budget", budget.join(","));
    if (age.length > 0) query.set("age", age.join(","));

    try {
      const response = await axios.get(
        `${serverPath}api/games/list?${query.toString()}&page_size=${pageSize}`,
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        }
      );
      setData(response.data.results);
      setDataCount(response.data.count);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
      setFiltersMobileModal(false);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      getGamesData();
    }
  }, [
    isInitialized,
    page,
    ordering,
    startingYear,
    endYear,
    categories,
    platforms,
    budget,
    age,
  ]);

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

  const changeOrder = (newOrder: string) => {
    setPage(1);
    setOrdering(newOrder);
    updateUrl({ ordering: newOrder, page: 1 });
  };

  const changeYearRange = (start: number, end: number) => {
    setPage(1);
    setStartingYear(start);
    setEndYear(end);
    updateUrl({ year1: start, year2: end, page: 1 });
  };

  const clearFilters = () => {
    setCategories([]);
    setPlatforms([]);
    setBudget([]);
    setAge([]);
    navigate(``, { replace: true });
  };

  const toggleCategory = (category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter((cat) => cat !== category)
      : [...categories, category];
    setCategories(newCategories);
    setPage(1);
    updateUrl({
      categories: newCategories.length > 0 ? newCategories.join(",") : null,
      page: 1,
    });
  };

  const togglePlatforms = (platform: string) => {
    const newPlatforms = platforms.includes(platform)
      ? platforms.filter((cat) => cat !== platform)
      : [...platforms, platform];
    setPlatforms(newPlatforms);
    setPage(1);
    updateUrl({
      platforms: newPlatforms.length > 0 ? newPlatforms.join(",") : null,
      page: 1,
    });
  };

  const toggleBudget = (x: string) => {
    const newBudget = budget.includes(x)
      ? budget.filter((cat) => cat !== x)
      : [...budget, x];
    setBudget(newBudget);
    setPage(1);
    updateUrl({
      budget: newBudget.length > 0 ? newBudget.join(",") : null,
      page: 1,
    });
  };

  const toggleAge = (x: string) => {
    const newAge = age.includes(x)
      ? age.filter((cat) => cat !== x)
      : [...age, x];
    setAge(newAge);
    setPage(1);
    updateUrl({
      age: newAge.length > 0 ? newAge.join(",") : null,
      page: 1,
    });
  };

  useEffect(() => {
    if (width > 1000) {
      setFiltersMobileModal(false);
    }
  }, [width]);

  return (
    <View background="blue">
      <div className={style.content}>
        <div className={style.title}>List of Games</div>
        <div className={style.separator} />
        <div className={style.container}>
          {width > 1000 && (
            <div className={style.filters_container}>
              <GamesFilters
                clearFilters={clearFilters}
                selectedCategories={categories}
                toggleCategory={toggleCategory}
                selectedPlatforms={platforms}
                togglePlatforms={togglePlatforms}
                selectedBudget={budget}
                toggleBudget={toggleBudget}
                selectedAgeRating={age}
                toggleAge={toggleAge}
              />
            </div>
          )}
          <div className={style.column}>
            {!loading && (
              <GamesOrders
                array={orders}
                current={orders.find((x) => x.value === ordering)?.name || ""}
                changeOrder={(x: any) => changeOrder(x?.value)}
                oldestYear={oldestYear}
                newestYear={newestYear}
                minYear={startingYear}
                maxYear={endYear}
                yearChange={(x: any, y: any) => changeYearRange(x, y)}
              />
            )}
            {width <= 1000 && (
              <DefaultButton
                onClick={() => setFiltersMobileModal(true)}
                text="Filters"
                classname={style.button}
              />
            )}
            <GamesListView data={data} loading={loading} pageSize={pageSize} />
            {!loading && (
              <Pagination
                amount={dataCount}
                currentPage={page}
                changePage={(x: any) => changePage(x)}
                pageSize={pageSize}
              />
            )}
          </div>
        </div>
      </div>
      <Modal setVisible={setFiltersMobileModal} visible={filtersMobileModal}>
        <div className={style.filters_modal}>
          <GamesFilters
            clearFilters={clearFilters}
            selectedCategories={categories}
            toggleCategory={toggleCategory}
            selectedPlatforms={platforms}
            togglePlatforms={togglePlatforms}
            selectedBudget={budget}
            toggleBudget={toggleBudget}
            selectedAgeRating={age}
            toggleAge={toggleAge}
          />
        </div>
      </Modal>
    </View>
  );
}

export default GamesList;
