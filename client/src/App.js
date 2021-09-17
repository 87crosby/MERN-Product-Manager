
import './App.css';
import {useState} from 'react';
import ProductForm from './components/ProductForm';
import OneProduct from './components/OneProduct';
import EditProduct from './components/EditProduct';
import {
  BrowserRouter,
  Switch,
  Route,
  Link 
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <Switch>
        <Route exact path="/">
          <ProductForm></ProductForm>
        </Route>
        <Route exact path="/product/:idParam">
          <OneProduct></OneProduct>
        </Route>
        <Route exact path="/product/edit/:idParam">
          <EditProduct></EditProduct>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
