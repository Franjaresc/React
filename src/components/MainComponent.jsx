import React from "react";
import HomeComponent from "./HomeComponent";
import Menu from "./MenuComponent";
import ContactComponent from "./ContactComponent";
import DishdetailComponent from "./DishdetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AboutComponent from "./AboutComponent";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MainComponent() {
  const dishes = useSelector((state) => state.dish.dishes);
  const comments = useSelector((state) => state.dish.comments);
  const promotions = useSelector((state) => state.dish.promotions);
  const leaders = useSelector((state) => state.dish.leaders);
  const dispatch = useDispatch();
  
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
