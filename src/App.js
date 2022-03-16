import React, {useState} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import './App.css';
import { DISHES } from './shared/dishes';


function App() {

  const [dishes, setDishes] = useState(DISHES);
  return (
    <div className="App">
      <Navbar dark color="primary">
      <NavbarBrand href="/">Risorante Con Fusion</NavbarBrand>
        
      </Navbar>
      <Menu dishes={dishes}/>
    </div>
  );
}

export default App;
