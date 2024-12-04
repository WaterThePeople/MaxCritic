import React from "react";
import style from "./ShowsFilters.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import ShowsCategories from "./Features/ShowsCategories/ShowsCategories";
import ShowsAgeRating from "./Features/ShowsAgeRating/ShowsAgeRating";

function ShowsFilters({
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
      <ShowsCategories
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
      />
      <ShowsAgeRating
        selectedAgeRating={selectedAgeRating}
        toggleAge={toggleAge}
      />
    </div>
  );
}

export default ShowsFilters;
