import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductsService } from "../../services/Products";

const AddProduct = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    product: {
      name: "",
      image: "",
      brand: "",
      madeIn: "",
      color: "",
      code: "",
      price: "",
      priceInSale: "",
    },
    errorMessage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      product: {
        ...state.product,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = (event) => {
    event.preventDefault();
    async function fetchData() {
      try {
        let response = await ProductsService.createProduct(state.product);
        if (response) {
          navigate("/allproduct", { replace: true });
        }
      } catch (error) {
        setState({
          ...state,
          errorMessage: error.message,
        });
        navigate("/basket", { replace: false });
      }
    }
    fetchData();
  };

  let { product } = state;

  return (
    <>
      <div className="row mt-5 ms-3">
        <div className="col-md-4">
          <form onSubmit={submitForm}>
            <div className="mb-2">
              <input
                required={true}
                name="name"
                value={product.name}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="mb-2">
              <input
                required={true}
                name="image"
                value={product.image}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="Image Url"
              />
            </div>
            <div className="mb-2">
              <input
                required={true}
                name="brand"
                value={product.brand}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="Brand"
              />
            </div>
            <div className="mb-2">
              <input
                required={true}
                name="madeIn"
                value={product.madeIn}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="MadeIn"
              />
            </div>
            <div className="mb-2">
              <input
                required={true}
                name="color"
                value={product.color}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="Color"
              />
            </div>
            <div className="mb-2">
              <input
                required={true}
                name="code"
                value={product.code}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="Code"
              />
            </div>
            <div className="mb-2">
              <input
                required={true}
                name="price"
                value={product.price}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="Price"
              />
            </div>
            <div className="mb-2">
              <input
                required={true}
                name="priceInSale"
                value={product.priceInSale}
                onChange={updateInput}
                type="text"
                className="form-control"
                placeholder="PriceInSale"
              />
            </div>
            <div className="mb-2">
              <input type="submit" className="btn btn-success" value="Create" />
              <Link to={"/allproduct"} className="btn btn-dark ms-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
