import styles from "./burger-ingredients.module.css";
import { useMemo, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Tabs from "../tabs/tabs";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import { TYPE_INGREDIENT } from "../../utils/prop-types";

// LEFT
const BurgerIngredients = ({ data }) => {
  const buns = useMemo(() => {
    const bunsList = data.filter((item) => item.type === "bun")
      .map((item, i) => (
        <li
          className={`${styles.list__item} ml-3 mr-3 mb-10`}
          key={item._id}
        >
          <Ingredient data={item} />
        </li>
      ))

    return bunsList;
  }, [data]);

  const sauces = useMemo(() => {
    const saucesList = data
      .filter((item) => item.type === "sauce")
      .map((item) => (
        <li
          className={`${styles.list__item} ml-3 mr-3 mb-10`}
          key={item._id}
        >
          <Ingredient data={item} />
        </li>
      ))

    return saucesList;
  }, [data]);

  // tabs
  const tabRef = useRef();

  const setCurrentTab = (tabName) => {

  };

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });
  const [mainsRef, inViewMains] = useInView({
    threshold: 0
  });

  const onTabClick = (tab) => {
    setCurrentTab(tab);

    const element = document.querySelector(`.${tab}`);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
  };

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('buns');
    } else if (inViewSauces) {
      setCurrentTab('sauces');
    } else if (inViewMains) {
      setCurrentTab('mains');
    }
  }, [inViewBuns, inViewSauces, inViewMains])

  const mains = useMemo(() => {
    const mainsList = data
      .filter((item) => item.type === "main")
      .map((item) => (
        <li
          className={`${styles.list__item} ml-3 mr-3 mb-10`}
          key={item._id}
        >
          <Ingredient data={item} />
        </li>
      ))

    return mainsList;
  }, [data]);

  return (
    <section className="ml-5 mr-5">
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <Tabs tabRef={tabRef} />
      <div className={`${styles.wrapper} custom-scroll`}>
        <h2 className="mb-6 text text_type_main-medium bun">Булки</h2>
        <ul className={`${styles.list} pt-3 pl-1 pr-1`} ref={bunsRef}>
          {buns}
        </ul>

        <h2 className="mb-6 text text_type_main-medium sauce">Соусы</h2>
        <ul className={`${styles.list} pt-3 pl-1 pr-1`} ref={saucesRef}>
          {sauces}
        </ul>

        <h2 className="mb-6 text text_type_main-medium main">Начинка</h2>
        <ul className={`${styles.list} pt-3 pl-1 pr-1`} ref={mainsRef}>
          {mains}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(TYPE_INGREDIENT).isRequired)
    .isRequired,
};

export default BurgerIngredients;
