import style from "./Search.module.sass";
import View from "wrappers/View/View";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");
  const page = queryParams.get("page");

  return (
    <View background>
      <div className={style.content}>
        <div className={style.title}>Search...</div>
        <div className={style.separator} />
        <div className={style.container}></div>
        <div className={style.title}>This is search bar value = {q}</div>
      </div>
    </View>
  );
}

export default Search;
