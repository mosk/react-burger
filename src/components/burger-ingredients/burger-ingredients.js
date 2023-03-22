import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import styles from "./burger-ingredients.module.css";

import Tabs from "../tabs/tabs";
import Ingredient from "./ingredient/ingredient";

import PropTypes from "prop-types";
import { TYPE_INGREDIENT } from "../../utils/prop-types";

// LEFT
const BurgerIngredients = ({ data }) => {
  const location = useLocation();

  // tabs
  const [currentTab, setCurrentTab] = useState("bun");

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });
  const [mainsRef, inViewMains] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("bun");
    } else if (inViewSauces) {
      setCurrentTab("sauce");
    } else if (inViewMains) {
      setCurrentTab("main");
    }
  }, [inViewBuns, inViewSauces, inViewMains]);

  // ingredients data
  const buns = useMemo(() => {
    const bunsList = data
      .filter((item) => item.type === "bun")
      .map((item, i) => (
        <li className={`${styles.list__item} ml-3 mr-3 mb-10`} key={item._id}>
          <Link to={{ pathname: `/ingredients/${item._id}` }} state={{ background: location }} className={styles.card}>
            <Ingredient data={item} />
          </Link>
        </li>
      ));

    return bunsList;
  }, [data, location]);

  const sauces = useMemo(() => {
    const saucesList = data
      .filter((item) => item.type === "sauce")
      .map((item) => (
        <li className={`${styles.list__item} ml-3 mr-3 mb-10`} key={item._id}>
          <Link to={{ pathname: `/ingredients/${item._id}` }} state={{ background: location }} className={styles.card}>
            <Ingredient data={item} />
          </Link>
        </li>
      ));

    return saucesList;
  }, [data, location]);

  const mains = useMemo(() => {
    const mainsList = data
      .filter((item) => item.type === "main")
      .map((item) => (
        <li className={`${styles.list__item} ml-3 mr-3 mb-10`} key={item._id}>
          <Link to={{ pathname: `/ingredients/${item._id}` }} state={{ background: location }} className={styles.card}>
            <Ingredient data={item} />
          </Link>
        </li>
      ));

    return mainsList;
  }, [data, location]);

  return (
    <section className="ml-5 mr-5">
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <Tabs setCurrentTab={setCurrentTab} currentTab={currentTab} />
      <div className={`${styles.wrapper} custom-scroll`}>
        <h2 className="mb-6 text text_type_main-medium">Булки</h2>
        <ul className={`${styles.list} pt-3 pl-1 pr-1 bun`} ref={bunsRef}>
          {buns}
        </ul>

        <h2 className="mb-6 text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.list} pt-3 pl-1 pr-1 sauce`} ref={saucesRef}>
          {sauces}
        </ul>

        <h2 className="mb-6 text text_type_main-medium">Начинка</h2>
        <ul className={`${styles.list} pt-3 pl-1 pr-1 main`} ref={mainsRef}>
          {mains}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(TYPE_INGREDIENT).isRequired), PropTypes.array])
    .isRequired,
};

export default BurgerIngredients;
