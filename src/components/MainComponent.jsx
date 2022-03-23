import React, { useState } from "react";
import HomeComponent from "./HomeComponent";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import DishdetailComponent from "./DishdetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { Routes, Route, Navigate } from "react-router-dom";

function MainComponent() {
  const [dishes, setDishes] = useState(DISHES);
  const HomePage = () => {
    return(
        <HomeComponent/>
    );
  }

  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/home" element={HomePage()} />
        <Route path="/menu" element={<Menu dishes={dishes}/>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default MainComponent;
