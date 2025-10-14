import { Fragment } from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import Productlist from "./pages/product-List"
import ProductDetails from "./pages/product-Details"
import CartList from "./pages/cart-list"

function App() {


  return (
      <Fragment>
        <Routes>
          <Route path="/" element={<Navigate to="/product-List" replace />} />
          <Route path="/product-List" element={<Productlist/>}></Route>
          <Route path="/product-Details/:id" element={<ProductDetails/>}></Route>
          <Route path="/cart-list" element={<CartList/>}></Route>
        </Routes>
      </Fragment>
  )
}

export default App
