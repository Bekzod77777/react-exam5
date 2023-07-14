import React from "react";
import "./Home.scss";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-top">
          <h3>Вы пока не создали ни одного товара</h3>
        </div>
        <div className="home-bottom">
          <NavLink to="/basket">
            <button>Создать первый товар</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
