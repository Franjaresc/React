import React, { useState } from "react";
import HomeComponent from "./HomeComponent";
import Menu from "./MenuComponent";
import ContactComponent from "./ContactComponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import DishdetailComponent from "./DishdetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import AboutComponent from "./AboutComponent";

function MainComponent() {
  const [dishes, setDishes] = useState(DISHES);
  const [comments, setComments] = useState(COMMENTS);
  const [promotions, setPromotions] = useState(PROMOTIONS);
  const [leaders, setLeaders] = useState(LEADERS);

  const HomePage = () => {
    return (
      <HomeComponent
        dish={dishes.filter((dish) => dish.featured)[0]}
        promotion={promotions.filter((promo) => promo.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  const DishWithId = () => {
    const match = useMatch("/menu/:dishId");
    return (
      <DishdetailComponent
        dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId))[0]}
        comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))}
      />
    );
  };

  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/menu" element={<Menu dishes={dishes} />} />
        <Route path="/menu/:dishId" element={<DishWithId/>} />
        <Route path="/contactus" element={<ContactComponent />} />
        <Route path="/aboutus" element={<AboutComponent leaders={leaders}/>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default MainComponent;
