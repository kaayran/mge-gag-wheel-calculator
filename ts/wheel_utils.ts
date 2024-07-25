import "./consts";
import {
  WHEEL_COUNT_MAX,
  WHEEL_START_PRICE,
  WHEEL_PRICE_INCREMENT,
} from "./consts";

export function getWheelPrice(wheelCount: number) {
  if (wheelCount <= WHEEL_COUNT_MAX) {
    return WHEEL_START_PRICE + (wheelCount - 1) * WHEEL_PRICE_INCREMENT;
  }

  return (
    WHEEL_START_PRICE +
    (wheelCount - WHEEL_COUNT_MAX - 1) * WHEEL_PRICE_INCREMENT
  );
}
