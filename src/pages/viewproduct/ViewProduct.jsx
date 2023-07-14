import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductsService } from "../../services/Products";
import "./ViewProduct.scss";

const ViewProduct = () => {
  let { productId } = useParams();
  let [state, setState] = useState({
    loading: false,
    product: {},
    errorMessage: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({
          ...state,
          loading: false,
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

  let { product } = state;
  return (
    <>
      {Object.keys(product).length > 0 && (
        <section className="view-contact mt-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <img className="contact-img3" src={product.image} alt="" />
              </div>
              <div className="col-md-8">
                <ul className="list-group">
                  <li className="list-group-item list-group-item-action">
                    Name:{" "}
                    <span className="fw-bold">
                      {""} {product.name}
                    </span>
                  </li>
                  <li className="list-group-item list-group-item-action">
                    Brand:{" "}
                    <span className="fw-bold">
                      {""} {product.brand}
                    </span>
                  </li>
                  <li className="list-group-item list-group-item-action">
                    MadeIn:
                    <span className="fw-bold">
                      {""} {product.madeIn}
                    </span>
                  </li>
                  <li className="list-group-item list-group-item-action">
                    Color:
                    <span className="fw-bold">
                      {""} {product.color}
                    </span>
                  </li>
                  <li className="list-group-item list-group-item-action">
                    Code:
                    <span className="fw-bold">
                      {""} {product.code}
                    </span>
                  </li>
                  <li className="list-group-item list-group-item-action">
                    Price:
                    <span className="fw-bold">
                      {""} {product.price}
                    </span>
                  </li>
                  <li className="list-group-item list-group-item-action">
                    PriceInSale:
                    <span className="fw-bold">
                      {""} {product.priceInSale}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col mt-3">
                <Link to={"/allproduct"} className="btn btn-warning">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ViewProduct;
