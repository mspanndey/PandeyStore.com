import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AdminRoute from "./component/AdminRoute";
import PrivateRoute from "./component/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/cartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/registerScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import AdminProductScreen from "./screens/Admin/adminProductScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProductEditScreen from "./screens/Admin/productEditScreen";
import UsersListScreen from "./screens/Admin/usersListScreen";
import UserEditscreen from "./screens/Admin/userEditscreen";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/page/:pageNumber" element={<HomeScreen />}></Route>
      <Route path="/search/:keyword" element={<HomeScreen />}></Route>
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      ></Route>

      <Route path="/product/:id" element={<ProductScreen />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}></Route>
        <Route path="/payment" element={<PaymentScreen />}></Route>
        <Route path="/placeOrder" element={<PlaceOrderScreen />}></Route>
        <Route path="/order/:id" element={<OrderScreen />}></Route>
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderList" element={<OrderListScreen />}></Route>
        <Route
          path="/admin/ProductList"
          element={<AdminProductScreen />}
        ></Route>
        <Route
          path="/admin/ProductList/page/:pageNumber"
          element={<AdminProductScreen />}
        ></Route>
        <Route
          path="/admin/product/:id/edit"
          element={<ProductEditScreen />}
        ></Route>
        <Route path="/admin/userList" element={<UsersListScreen />}></Route>
        <Route
          path="/admin/users/:id/edit"
          element={<UserEditscreen />}
        ></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={false}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
