import "./AllProduct.scss";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductsService } from "../../services/Products";
import Spinner from "../../components/Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";

// Confirmation Dialog component
const ConfirmationDialog = ({ onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn btn-danger my-1">
        <i className="fa fa-trash" />
      </button>
      {isOpen && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <h3>Dialog</h3>
            <p>O'chirishni xoxlaysizmi?</p>
            <div className="dialog-actions">
              <button onClick={handleConfirm} className="btn btn-success">
                Confirm
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AllProduct = () => {
  let [query, setQuery] = useState({
    text: "",
  });
  let [state, setState] = useState({
    products: [],
    filteredProducts: [],
    errorMessage: "",
    currentPage: 1,
  });

  const productsPerPage = 4;
  const paginationNumbersToShow = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state });
        let response = await ProductsService.getAllProducts();
        setState({
          ...state,
          products: response.data,
          filteredProducts: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, []);

  let { filteredProducts, currentPage } = state;

  // Pagination logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const middlePage = Math.ceil(paginationNumbersToShow / 2);
  const firstPageInRange = Math.max(1, currentPage - middlePage + 1);
  const lastPageInRange = Math.min(
    totalPages,
    firstPageInRange + paginationNumbersToShow - 1
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => {
    setState({ ...state, currentPage: pageNumber });
  };

  let clickDelete = (productId) => {
    async function fetchData() {
      try {
        let response = await ProductsService.deleteProduct(productId);
        if (response) {
          setState({
            ...state,
            loading: true,
          });
          let response = await ProductsService.getAllProducts();
          // Display success toast notification
          toast.success("Muvaffaqiyatli o'chirildi!");
          setState({
            ...state,
            loading: false,
            products: response.data,
            filteredProducts: response.data,
          });
        }
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  };

  let searchProducts = (event) => {
    setQuery({
      ...query,
      text: event.target.value,
    });
    let theProducts = state.products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredProducts: theProducts,
    });
  };

  let { loading } = state;
  return (
    <>
      <div className="allproduct__top">
        <div className="allproduct__top-title">
          <h3>Все товары ({filteredProducts.length})</h3>
        </div>
        <div className="allproduct__top-search">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_171_7939)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.7929 13.2929C13.1834 12.9024 13.8166 12.9024 14.2071 13.2929L19.7071 18.7929C20.0976 19.1834 20.0976 19.8166 19.7071 20.2071C19.3166 20.5976 18.6834 20.5976 18.2929 20.2071L12.7929 14.7071C12.4024 14.3166 12.4024 13.6834 12.7929 13.2929Z"
                fill="#D1D1DD"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 16.5C12.4183 16.5 16 12.9183 16 8.5C16 4.08172 12.4183 0.5 8 0.5C3.58172 0.5 0 4.08172 0 8.5C0 12.9183 3.58172 16.5 8 16.5ZM8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5Z"
                fill="#A4A4BA"
              />
            </g>
            <defs>
              <clipPath id="clip0_171_7939">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <input
            name="text"
            value={query.text}
            onChange={searchProducts}
            type="text"
            placeholder="Поиск"
          />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="allproduct__bottom">
            <section className="contact-list">
              <div className="container">
                <div className="row">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div className="col-md-6" key={product.id}>
                        <div className="col-md-12" key={product.id}>
                          <div className="card my-2">
                            <div className="card-body">
                              <div className="row align-items-center d-flex justify-content-around">
                                <div className="col-md-4">
                                  <img
                                    className="img-fluid contact-img"
                                    src={product.image}
                                    alt=""
                                  />
                                </div>
                                <div className="col-md-7">
                                  <ul className="list-group">
                                    <li className="list-group-item list-group-item-action">
                                      Name:{" "}
                                      <span className="fw-bold">
                                        {product.name}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      Brand:{" "}
                                      <span className="fw-bold">
                                        {product.brand}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      MadeIn:{" "}
                                      <span className="fw-bold">
                                        {product.madeIn}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action d-flex justify-content-between">
                                      <div>
                                        Color:{" "}
                                        <span className="fw-bold">
                                          {product.color}
                                        </span>{" "}
                                      </div>
                                      <div>
                                        Code:{" "}
                                        <span className="fw-bold">
                                          {product.code}
                                        </span>
                                      </div>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      Price:{" "}
                                      <span className="fw-bold">
                                        {product.price}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      PriceInSale:{" "}
                                      <span className="fw-bold">
                                        {product.priceInSale}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-1 d-flex flex-column align-items-center">
                                  <Link
                                    to={`/products/view/${product.id}`}
                                    className="btn btn-warning my-1"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                  <Link
                                    to={`/products/edit/${product.id}`}
                                    className="btn btn-primary my-1"
                                  >
                                    <i className="fa fa-pen" />
                                  </Link>
                                  <ConfirmationDialog
                                    onConfirm={() => clickDelete(product.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-md-12">No products found.</div>
                  )}
                </div>
              </div>
            </section>
            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from(
                { length: lastPageInRange - firstPageInRange + 1 },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(firstPageInRange + index)}
                    className={
                      currentPage === firstPageInRange + index ? "active" : ""
                    }
                  >
                    {firstPageInRange + index}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastProduct >= totalProducts}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      <div className="allproduct__button">
        <NavLink to="/basket" className="nav-link2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_215_1529)">
              <rect
                x="12"
                y="5"
                width="2"
                height="12"
                rx="1"
                transform="rotate(90 12 5)"
                fill="#8DE2C6"
              />
              <rect x="5" width="2" height="12" rx="1" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_215_1529">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Новый товар
        </NavLink>
      </div>
      <ToastContainer />
    </>
  );
};

export default AllProduct;
