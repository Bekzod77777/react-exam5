import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthUserContext } from "./utils/auth";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/home/Home";
import AddProduct from "./pages/addproduct/AddProduct";
import AllProduct from "./pages/allproduct/AllProduct";
import EditProduct from "./pages/editproduct/EditProduct";
import ViewProduct from "./pages/viewproduct/ViewProduct";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <AuthUserContext>
        <Router>
          <AdminLayout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/allproduct" element={<AllProduct />} />
              <Route path="/basket" element={<AddProduct />} />
              <Route
                path="/products/view/:productId"
                element={<ViewProduct />}
              />
              <Route
                path="/products/edit/:productId"
                element={<EditProduct />}
              />
            </Routes>
          </AdminLayout>
        </Router>
      </AuthUserContext>
    </>
  );
}

export default App;
