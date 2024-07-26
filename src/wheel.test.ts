import { getWheelPrice } from "./wheel";

test("check wheel prices", () => {
  expect(getWheelPrice(1)).toBe(500);
  expect(getWheelPrice(2)).toBe(1000);
  expect(getWheelPrice(35)).toBe(17500);
  expect(getWheelPrice(36)).toBe(500);
});
