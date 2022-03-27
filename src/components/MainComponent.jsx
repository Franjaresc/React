import React, { useEffect } from "react";
import HomeComponent from "./HomeComponent";
import Menu from "./MenuComponent";
import ContactComponent from "./ContactComponent";
import DishdetailComponent from "./DishdetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AboutComponent from "./AboutComponent";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../redux/commentSlice";
import { fetchDishes } from "../redux/dishSlice";

function MainComponent() {
  const dishes = useSelector((state) => state.dish);
  const comments = useSelector((state) => state.comment.comments);
  const promotions = useSelector((state) => state.promotion.promotions);
  const leaders = useSelector((state) => state.leader.leaders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const HomePage = () => {
    
    return (
      <HomeComponent
        dish={dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={dishes.loading}
        dishesErrMess={dishes.errMess}
        promotion={promotions.filter((promo) => promo.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  const DishWithId = () => {
    const match = useMatch("/menu/:dishId");
    return (
      <DishdetailComponent
        dish={
          dishes.dishes.filter(
            (dish) => dish.id === parseInt(match.params.dishId)
          )[0]
        }
        isLoading={dishes.loading}
        errMess={dishes.errMess}
        comments={comments.filter(
          (comment) => comment.dishId === parseInt(match.params.dishId)
        )}
        addComment={(dishId, rating, author, comment) =>
          dispatch(addComment(dishId, rating, author, comment))
        }
      />
    );
  };

  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<Menu dishes={dishes} />} />
        <Route path="/menu/:dishId" element={<DishWithId />} />
        <Route path="/contactus" element={<ContactComponent />} />
        <Route path="/aboutus" element={<AboutComponent leaders={leaders} />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default MainComponent;
