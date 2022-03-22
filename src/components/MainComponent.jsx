import React, {useState} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishdetailComponent from "./DishdetailComponent";


function MainComponent() {

  const [dishes, setDishes] = useState(DISHES);
  const [selectedDish, setSelectedDish] = useState(null);
  const onDishSelected = (dishId) => {
    setSelectedDish(dishId);
  };

  return (
    <div className="App">
      <Navbar dark color="primary">
      <NavbarBrand href="/">Risorante Con Fusion</NavbarBrand>
        
      </Navbar>
      <Menu dishes={dishes}
      onClick={(dishId) => onDishSelected(dishId)}/>
      <DishdetailComponent 
      dish={dishes.filter((dish) => dish.id === selectedDish)[0]}/>
    </div>
  );
}

export default MainComponent;
