import style from "./Discover.module.sass";
import { Icon } from "components/Icon/Icon";

function Discover() {
  return (
    <div className={style.container}>
      <div className={style.header}>Discover the Many Possibilities</div>
      <div className={style.row}>
        <div className={style.card}>
          <Icon
            name={"heart"}
            size={72}
            className={style.svg}
            viewBox="-8 0 32 32"
          />
          <div className={style.title}>Check Out your Favourites</div>
          <div className={style.text}>
            Browse through a wide collection of games, movies, tv-shows and
            music!
          </div>
        </div>
        <div className={style.card}>
          <Icon
            name={"list"}
            size={48}
            className={style.svg}
            viewBox="0 0 24 24"
          />
          <div className={style.title}>Create your own Library</div>
          <div className={style.text}>
            Add your favoured media to your library.
            <br />
            Store all of your most beloved entertainment in one place!
          </div>
        </div>
        <div className={style.card}>
          <Icon
            name={"star"}
            size={48}
            className={style.svg}
            viewBox="0 0 24 24"
          />
          <div className={style.title}>Rate and Review</div>
          <div className={style.text}>
            Rate the media of your choice!
            <br />
            Add a review for other users to see!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
