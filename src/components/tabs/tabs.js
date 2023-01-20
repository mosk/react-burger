import React from "react";
// import styles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = () => {
  const [current, setCurrent] = React.useState(`bun`);

  return (
    <div className="mb-10" style={{ display: "flex" }}>
      <Tab
        value="bun"
        active={current === "bun"}
        key={`bun`}
        onClick={setCurrent}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        key={`sauce`}
        onClick={setCurrent}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "main"}
        key={`main`}
        onClick={setCurrent}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
