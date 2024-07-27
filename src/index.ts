import { animateElement } from "./animations";
import {
  checkButtonElem,
  donationAmountElem,
  currWheelsCountElem,
  wheelCountElem,
  donationLeftElem,
  nextWheelPriceElem,
  midasElem,
  isMidasActive,
} from "./doc-utils";
import { calculateWheelsCount, getWheelPrice } from "./wheel";
import { MIDAS_HAND_WHEEL_PRICE, WHEEL_COUNT_MAX } from "./wheel-consts";

document.addEventListener("DOMContentLoaded", setNextWheelPrice);
donationAmountElem.addEventListener("change", handleInputElementsChange);
currWheelsCountElem.addEventListener("change", handleInputElementsChange);
midasElem.addEventListener("change", handleInputElementsChange);

function setNextWheelPrice() {
  let wheelsCount = currWheelsCountElem.valueAsNumber || 0;

  wheelsCount = wheelsCount % WHEEL_COUNT_MAX;

  let nextWheelPrice = isMidasActive() ? MIDAS_HAND_WHEEL_PRICE : getWheelPrice(wheelsCount + 1);
  nextWheelPriceElem.value = nextWheelPrice.toString();
}

function handleInputElementsChange() {
  let donationAmount = donationAmountElem.valueAsNumber || 0;
  let currWheelsCount = currWheelsCountElem.valueAsNumber || 0;
  let useMidas = isMidasActive();

  let donationData = calculateWheelsCount(donationAmount, currWheelsCount, useMidas);

  animateElement(wheelCountElem, wheelCountElem.valueAsNumber || 0, donationData.wheelsCount);
  animateElement(donationLeftElem, donationLeftElem.valueAsNumber || 0, donationData.donationLeft);
  animateElement(nextWheelPriceElem, nextWheelPriceElem.valueAsNumber || 0, donationData.nextWheelPrice);
}
