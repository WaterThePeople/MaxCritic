import React from "react";
import style from "./Library.module.sass";
import View from "wrappers/View/View";

function Library() {
  return (
    <View>
      <div className={style.container}>This is Library screen</div>
    </View>
  );
}

export default Library;
