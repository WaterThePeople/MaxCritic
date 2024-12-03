import React from "react";
import style from "./MoviesFilters.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import MoviesCategories from "./Features/MoviesCategories/MoviesCategories";
import MoviesAgeRating from "./Features/MoviesAgeRating/MoviesAgeRating";

function MoviesFilters({
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
      <MoviesCategories
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
      />
      <MoviesAgeRating
        selectedAgeRating={selectedAgeRating}
        toggleAge={toggleAge}
      />
    </div>
  );
}

export default MoviesFilters;
