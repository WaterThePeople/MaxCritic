import React from "react";
import style from "./GamesFilters.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import GamesCategories from "./Features/GamesCategories/GamesCategories";
import GamesPlatforms from "./Features/GamesPlatforms/GamesPlatforms";
import GamesBudget from "./Features/GamesBudget/GamesBudget";
import GamesAgeRating from "./Features/GamesAgeRating/GamesAgeRating";

function GamesFilters({
  clearFilters,
  selectedCategories,
  toggleCategory,
  selectedPlatforms,
  togglePlatforms,
  selectedBudget,
  toggleBudget,
  selectedAgeRating,
  toggleAge,
}: {
  clearFilters: Function;
  selectedCategories: string[];
  toggleCategory: Function;
  selectedPlatforms: string[];
  togglePlatforms: Function;
  selectedBudget: string[];
  toggleBudget: Function;
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
      <GamesCategories
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
      />
      <GamesPlatforms
        selectedPlatforms={selectedPlatforms}
        togglePlatforms={togglePlatforms}
      />
      <GamesBudget
        selectedBudget={selectedBudget}
        toggleBudget={toggleBudget}
      />
      <GamesAgeRating
        selectedAgeRating={selectedAgeRating}
        toggleAge={toggleAge}
      />
    </div>
  );
}

export default GamesFilters;
