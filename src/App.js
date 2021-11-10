import { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import setUserData from "./actions/setUserData";

import history from "./utils/history";
import ScrollToTop from "./utils/ScrollToTop";

import "./App.css";

import Homepage from "./pages/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import BuyPage from "./pages/BuyPage/BuyPage";
import Login from "./pages/LoginPage/LoginPage";

import Loader from "./components/Loader/Loader";
import axios from "./utils/axios";

function App() {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
  const globalState = useSelector((state) => state);
  useEffect(() => {
    if (globalState.token) {
      async function fetchData() {
        const data = await axios.get("/api/users/getUserData");
        dispatch(setUserData(data.data));
        setLoading(false);
        console.log(globalState);
      }
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, globalState.token]);

  return (
    <Router history={history}>
      <ScrollToTop />
      {!Loading ? (
        <Layout>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/categorias" component={CategoriesPage} />
          <Route exact path="/categorias/:category" component={ProductsPage} />
          <Route exact path="/producto/:product" component={ProductPage} />
          <Route exact path="/carrito" component={CartPage} />
          <Route exact path="/comprar" component={BuyPage} />
          <Route exact path="/login" component={Login} />
        </Layout>
      ) : (
        <Loader />
      )}
    </Router>
  );
}

export default App;
