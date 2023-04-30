import "@4tw/cypress-drag-drop";
import { SELECTOR, USER, BUN_NAME, LOADING } from "./constructor.constants";

describe("Constructor must work correctly", () => {
  beforeEach(() => {
    cy.visit(`/`);
  });

  it("Should open constructor by default", () => {
    cy.contains("Соберите бургер");
  });

  it("Should open modal with ingredient after ingredient click", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).first().click();
    cy.get(SELECTOR.MODAL).contains("Детали ингредиента");
    cy.get(SELECTOR.MODAL).contains(BUN_NAME);
  });

  it("Should close modal with ingredient after click close button", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).first().click();
    cy.get(`${SELECTOR.MODAL} ${SELECTOR.BUTTON.CLOSE}`).click();
  });

  // it("Should close modal with ingredient after press escape", () => {
  //   cy.get(SELECTOR.INGREDIENT).first().click();
  //   cy.get(`${SELECTOR.MODAL}`).type("{ esc }");
  // });

  it("Should drop ingredient into constructor", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(4).drag(SELECTOR.CONSTRUCTOR);
  });

  it("Should drop many ingredients into constructor", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(4).drag(SELECTOR.CONSTRUCTOR);
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(6).drag(SELECTOR.CONSTRUCTOR);
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(8).drag(SELECTOR.CONSTRUCTOR);
  });

  it("Should drop bun into constructor", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(1).drag(SELECTOR.CONSTRUCTOR);
  });

  it("Should remove ingredient from constructor", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(3).drag(SELECTOR.CONSTRUCTOR);
    cy.get(SELECTOR.INGREDIENT.FROM_CONSTRUCTOR).get(SELECTOR.BUTTON.REMOVE).click();
  });
});

describe("Making order", () => {
  const dragAndClick = () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(1).drag(SELECTOR.CONSTRUCTOR);
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(5).drag(SELECTOR.CONSTRUCTOR);
    cy.get(SELECTOR.BUTTON.ORDER).click();
  };

  const login = () => {
    cy.get(SELECTOR.LOGIN.EMAIL).type(USER.EMAIL);
    cy.get(SELECTOR.LOGIN.PASSWORD).type(USER.PASSWORD);
    cy.get(SELECTOR.BUTTON.LOGIN).click();
  };

  const getOrder = () => {
    cy.get(SELECTOR.BUTTON.ORDER).click();
    cy.get(SELECTOR.MODAL).contains("Информация о заказе");
    cy.wait(LOADING); // как лучше дождаться загрузки заказа?
    cy.get(SELECTOR.MODAL).contains("Ваш заказ начали готовить");
    cy.get(`${SELECTOR.MODAL} ${SELECTOR.BUTTON.CLOSE}`).click();
  };

  beforeEach(() => {
    cy.visit(`/`);
  });

  it("Order button should be disabled when constructor doesn't contain bun", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(3).drag(SELECTOR.CONSTRUCTOR);
    cy.get(SELECTOR.BUTTON.ORDER).should("be.disabled");
  });

  it("Order price should be empty when constructor is empty", () => {
    cy.get(SELECTOR.INGREDIENT.FROM_LIST).eq(3).drag(SELECTOR.CONSTRUCTOR);
    cy.get(SELECTOR.INGREDIENT.FROM_CONSTRUCTOR).get(SELECTOR.BUTTON.REMOVE).click();
    cy.get(SELECTOR.PRICE.TOTAL).should("be.empty");
  });

  it("Should route to auth when unauth user try to make order", () => {
    dragAndClick();
    cy.get(SELECTOR.LOGIN.FORM);
  });

  it("Should return to constructor after successful login", () => {
    dragAndClick();
    login();
    cy.contains("Соберите бургер");
  });

  it("Should make order and get order ID", () => {
    dragAndClick();
    login();
    getOrder();
  });
});
