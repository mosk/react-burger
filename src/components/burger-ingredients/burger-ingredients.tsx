import { useState, useMemo, useEffect, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import styles from "./burger-ingredients.module.css";

import Tabs from "../tabs/tabs";
import Ingredient from "./ingredient/ingredient";

import { TIngredient } from "../../types/types";

interface BurgerIngredientsProps {
  data: TIngredient[];
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ data }) => {
  const location = useLocation();

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

export default BurgerIngredients;
