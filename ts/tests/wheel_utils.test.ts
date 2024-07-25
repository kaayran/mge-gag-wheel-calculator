import { getWheelPrice } from "../wheel_utils";

test("2nd wheel price", () => {
  expect(getWheelPrice(2)).toBe(1000);
});
