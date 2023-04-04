import { FC } from "react";
// import styles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface ITabsProps {
  setCurrentTab: (tabName: string) => void;
  currentTab: string;
}

const Tabs: FC<ITabsProps> = ({ setCurrentTab, currentTab }) => {
  const tabClickHandler = (tab: string) => {
    setCurrentTab(tab);

    const element = document.querySelector(`.${tab}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-10" style={{ display: "flex" }}>
      <Tab value="bun" active={currentTab === "bun"} key={`bun`} onClick={() => tabClickHandler("bun")}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentTab === "sauce"} key={`sauce`} onClick={() => tabClickHandler("sauce")}>
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === "main"} key={`main`} onClick={() => tabClickHandler("main")}>
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
