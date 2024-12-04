import React from "react";
import style from "./SongsFilters.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import SongsCategories from "./Features/SongsCategories/SongsCategories";
import SongsAgeRating from "./Features/SongsAgeRating/SongsAgeRating";

function SongsFilters({
  clearFilters,
  selectedCategories,
  toggleCategory,
  selectedAgeRating,
  toggleAge,
}: {
  clearFilters: Function;
  selectedCategories: string[];
  toggleCategory: Function;
  selectedAgeRating: string[];
  toggleAge: Function;
}) {
  return (
    <div className={style.container}>
      <DefaultButton
        onClick={clearFilters}
        text="Clear Filters"
        classname={style.button}
      />
      <SongsCategories
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
      />
      <SongsAgeRating
        selectedAgeRating={selectedAgeRating}
        toggleAge={toggleAge}
      />
    </div>
  );
}

export default SongsFilters;
