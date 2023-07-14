import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductsService } from "../../services/Products";
import "./EditProduct.scss";
import Spinner from "../../components/Spinner/Spinner";

const EditProduct = () => {
  let navigate = useNavigate();
  let { productId } = useParams();
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

  useEffect(() => {
    async function fetchData() {
      try {
        setState({
          ...state,
          loading: true,
        });
        let response = await ProductsService.getProduct(productId);
        setState({
          ...state,
          loading: false,
          product: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, [productId]);

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
        let response = await ProductsService.updateProduct(
          state.product,
          productId
        );
        if (response) {
          navigate("/allproduct", { replace: true });
        }
      } catch (error) {
        setState({
          ...state,
          errorMessage: error.message,
        });
        navigate(`/products/edit/${productId}`, { replace: false });
      }
    }
    fetchData();
  };

  let { product, loading } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row align-items-center">
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
                        placeholder="Image"
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
                        placeholder="brand"
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
                        placeholder="madeIn"
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
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/allproduct"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img className="contact-img2" src={product.image} alt="" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditProduct;
