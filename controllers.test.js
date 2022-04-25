// import createSendObj from "./controllers.js";
const controllers = require("./controllers.js");

describe("Sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(controllers.createSendObj("343")).toBe(3);
  });
});
