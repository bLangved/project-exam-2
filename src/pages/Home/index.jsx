import React, { useState } from "react";
import Cards from "./Cards";
import CardsCategory from "./CardsCategory";

function Home() {
  const [category, setCategory] = useState("latest");

  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  return (
    <>
      <CardsCategory onSelectCategory={handleCategorySelect} />
      <Cards category={category} />
    </>
  );
}

export default Home;
