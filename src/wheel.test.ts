import { calculateWheelsCount, getWheelPrice } from "./wheel";
import { MIDAS_HAND_WHEEL_PRICE, WHEEL_COUNT_MAX, WHEEL_PRICE_INCREMENT, WHEEL_START_PRICE } from "./wheel-consts";

test("check wheel prices", () => {
  expect(getWheelPrice(1)).toBe(WHEEL_START_PRICE);
  expect(getWheelPrice(2)).toBe(WHEEL_START_PRICE + WHEEL_PRICE_INCREMENT);
  expect(getWheelPrice(WHEEL_COUNT_MAX)).toBe(WHEEL_START_PRICE + (WHEEL_COUNT_MAX - 1) * WHEEL_PRICE_INCREMENT);
  expect(getWheelPrice(WHEEL_COUNT_MAX + 1)).toBe(WHEEL_START_PRICE);
  expect(getWheelPrice(WHEEL_COUNT_MAX * 2 + 1)).toBe(WHEEL_START_PRICE);
});

test("check wheel donation data", () => {
  let data = calculateWheelsCount(315000, 0, false);
  expect(data.donationLeft).toBe(0);
  expect(data.wheelsCount).toBe(35);
  expect(data.nextWheelPrice).toBe(500);
});

test("check wheel with midas", () => {
  let data = calculateWheelsCount(MIDAS_HAND_WHEEL_PRICE, 0, true);
  expect(data.donationLeft).toBe(0);
  expect(data.wheelsCount).toBe(1);
  expect(data.nextWheelPrice).toBe(MIDAS_HAND_WHEEL_PRICE);

  data = calculateWheelsCount(6500, 0, true);
  expect(data.donationLeft).toBe(500);
  expect(data.wheelsCount).toBe(5);
  expect(data.nextWheelPrice).toBe(1500);
});

test("check wheel prices with floats", () => {
  expect(getWheelPrice(2.5)).toBe(WHEEL_START_PRICE + WHEEL_PRICE_INCREMENT);
});
