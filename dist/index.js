import {
  donationAmountElem,
  currWheelsCountElem,
  wheelCountElem,
  donationLeftElem,
  nextWheelPriceElem,
  midasElem,
  isMidasActive
} from "./doc-utils.js";
import {calculateWheelsCount, getWheelPrice} from "./wheel.js";
import {MIDAS_HAND_WHEEL_PRICE, WHEEL_COUNT_MAX} from "./wheel-consts.js";
document.addEventListener("DOMContentLoaded", setNextWheelPrice);
donationAmountElem.addEventListener("change", handleInputElementsChange);
currWheelsCountElem.addEventListener("change", handleInputElementsChange);
midasElem.addEventListener("change", handleInputElementsChange);
function setNextWheelPrice() {
  let wheelsCount = currWheelsCountElem.valueAsNumber;
  wheelsCount = wheelsCount % WHEEL_COUNT_MAX;
  let nextWheelPrice = isMidasActive() ? MIDAS_HAND_WHEEL_PRICE : getWheelPrice(wheelsCount + 1);
  nextWheelPriceElem.value = nextWheelPrice.toString();
}
function handleInputElementsChange() {
  let donationAmount = donationAmountElem.valueAsNumber;
  let currWheelsCount = currWheelsCountElem.valueAsNumber;
  let useMidas = isMidasActive();
  let donationData = calculateWheelsCount(donationAmount, currWheelsCount, useMidas);
  wheelCountElem.value = donationData.wheelsCount.toString();
  donationLeftElem.value = donationData.donationLeft.toString();
  nextWheelPriceElem.value = donationData.nextWheelPrice.toString();
}
