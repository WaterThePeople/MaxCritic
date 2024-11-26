import style from "./GamesLibrary.module.sass";
import LibraryItem from "components/LibraryItem/LibraryItem";

function GamesLibrary({ data }: { data: any[] }) {
  return (
    <div className={style.container}>
      {data?.length > 0 ? (
        data.map((item: any, index: number) => (
          <LibraryItem
            key={index}
            name={item?.name}
            image={item?.image}
            slug={item?.slug}
          />
        ))
      ) : (
        <div className={style.no_data}>Your library is empty!</div>
      )}
    </div>
  );
}

export default GamesLibrary;
