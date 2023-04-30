export const SELECTOR = {
  INGREDIENT: {
    FROM_LIST: `a[class^='burger-ingredients_card']`,
    FROM_CONSTRUCTOR: `li[class^='ingredient_list__item']`,
  },
  MODAL: `div[class^='modal_modal']`,
  BUTTON: {
    CLOSE: `button[class^='modal_button--close']`,
    REMOVE: `[class*='constructor-element__action']`,
    ORDER: `div[class^='burger-constructor_order'] button`,
    LOGIN: `form[class^='sign-in_form'] button`,
  },
  CONSTRUCTOR: `section[class^='burger-constructor_section']`,
  PRICE: {
    TOTAL: `[class^='burger-constructor_price']`,
  },
  LOGIN: {
    FORM: `form[class^='sign-in_form']`,
    EMAIL: `.input_type_email input`,
    PASSWORD: `.input_type_password input`,
  },
  ORDER: {
    ID: `div[class^='modal_modal'] p[class*='text_type_digits-large']`,
  },
};

export const USER = {
  EMAIL: `asdasd@asdasd.com`,
  PASSWORD: `password`,
};

export const LOADING = 20000; // time when order creating

export const BUN_NAME = `Краторная булка N-200i`;
