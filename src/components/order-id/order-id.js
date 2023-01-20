import styles from "./order-id.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const OrderId = ({ id }) => {
  return (
    <>
      <p className="text_type_digits-large mt-20 mb-8">{id}</p>
      <p className="text text_type_main-medium mb-10 pb-10">
        идентификатор заказа
      </p>
      <i className={`${styles["icon--success"]} mb-10`}>
        <CheckMarkIcon type="primary" />
      </i>
      <p className="text text_type_main-default mb-2 pt-10">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на&nbsp;орбитальной станции
      </p>
    </>
  );
};

OrderId.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
};

export default OrderId;
