import style from "./LibraryList.module.sass";
import LibraryItem from "components/LibraryItem/LibraryItem";
import cn from "classnames";

function LibraryList({
  data,
  returnCurrentType,
}: {
  data: any[];
  returnCurrentType: Function;
}) {
  const size = (x: number) => {
    if (x == 1) {
      return style.size_1;
    }
    if (x == 2) {
      return style.size_2;
    }
    if (x == 3) {
      return style.size_3;
    }
    if (x == 4) {
      return style.size_4;
    }
  };

  return (
    <div className={cn(style.container, size(data?.length))}>
      {data?.length > 0 ? (
        data.map((item: any, index: number) => (
          <LibraryItem
            key={index}
            name={item?.name}
            image={item?.image}
            slug={`/${returnCurrentType()}/${item?.slug}`}
          />
        ))
      ) : (
        <div className={style.no_data}>Your library is empty!</div>
      )}
    </div>
  );
}

export default LibraryList;
