import React, { useState, useEffect } from "react";
import style from "./Library.module.sass";
import View from "wrappers/View/View";
import DropdownModal from "components/DropdownModal/DropdownModal";

const libraries = ["Games", "Movies", "TV Shows", "Music"];

function Library() {
  const [currentLibrary, setCurrentLibrary] = useState(libraries[0]);

  return (
    <View background>
      <div className={style.content}>
        <div className={style.top_row}>
          <div className={style.title}>Your Library</div>
          <DropdownModal
            array={libraries}
            value={currentLibrary}
            onClick={(x: any) => setCurrentLibrary(x)}
          />
        </div>
        <div className={style.separator} />
        <div className={style.container}></div>
      </div>
    </View>
  );
}

export default Library;
