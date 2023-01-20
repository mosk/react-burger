import PropTypes from "prop-types";

const TYPE_INGREDIENT = {
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired,
};

export { TYPE_INGREDIENT };
