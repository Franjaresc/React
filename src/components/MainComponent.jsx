import React, { useEffect } from "react";
import HomeComponent from "./HomeComponent";
import Menu from "./MenuComponent";
import ContactComponent from "./ContactComponent";
import DishdetailComponent from "./DishdetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AboutComponent from "./AboutComponent";
import {
  Routes,
  Route,
  Navigate,
  useMatch,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postComment, fetchComments } from "../redux/commentSlice";
import { fetchFeedbacks, postFeedback } from "../redux/feedbackSlice";
import { fetchDishes } from "../redux/dishSlice";
import { fetchPromotions } from "../redux/promotionSlice";
import { fetchLeaders } from "../redux/leaderSlice";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function MainComponent(props) {
  const dishes = useSelector((state) => state.dish);
  const comments = useSelector((state) => state.comment);
  const promotions = useSelector((state) => state.promotion);
  const leaders = useSelector((state) => state.leader);
  const feedbacks = useSelector((state) => state.feedbacks);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchComments());
    dispatch(fetchPromotions());
    dispatch(fetchLeaders());
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const HomePage = () => {
    return (
      <HomeComponent
        dish={dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={dishes.loading}
        dishesErrMess={dishes.errMess}
        promotion={promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={promotions.loading}
        promoErrMess={promotions.errMess}
        leader={leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={leaders.loading}
        leaderErrMess={leaders.errMess}
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
        comments={comments.comments.filter(
          (comment) => comment.dishId === parseInt(match.params.dishId)
        )}
        commentsErrMess={comments.errMess}
        commentsLoading={comments.loading}
        postComment={(dishId, rating, author, comment) =>
          dispatch(postComment(dishId, rating, author, comment))
        }
      />
    );
  };
  return (
    <div className="App">
      <HeaderComponent />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/menu" element={<Menu dishes={dishes} />} />
            <Route path="/menu/:dishId" element={<DishWithId />} />
            <Route
              path="/contactus"
              element={
                <ContactComponent
                  postFeedback={(firstname, lastname, telnum, email, agree, contactType, message, id) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, id))}
                  feedbacks={feedbacks}
                />
              }
            />
            <Route
              path="/aboutus"
              element={<AboutComponent leaders={leaders} />}
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <FooterComponent />
    </div>
  );
}

export default MainComponent;
