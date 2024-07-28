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

document.addEventListener("DOMContentLoaded", handleInputElementsChange);
donationAmountElem.addEventListener("change", handleInputElementsChange);
currWheelsCountElem.addEventListener("change", handleInputElementsChange);
midasElem.addEventListener("change", handleInputElementsChange);

function handleInputElementsChange() {
  let absCurrWheelsCount = getValidInputValue(currWheelsCountElem.valueAsNumber);
  let absDonationAmount = getValidInputValue(donationAmountElem.valueAsNumber, false);
  
  let useMidas = isMidasActive();

  let donationData = calculateWheelsCount(absDonationAmount, absCurrWheelsCount, useMidas);

  animateElement(wheelCountElem, wheelCountElem.valueAsNumber || 0, donationData.wheelsCount);
  animateElement(donationLeftElem, donationLeftElem.valueAsNumber || 0, donationData.donationLeft);
  animateElement(nextWheelPriceElem, nextWheelPriceElem.valueAsNumber || 0, donationData.nextWheelPrice);
}

function getValidInputValue(value: number, round: boolean = true): number {
  let absValue = round ? Math.floor(value) || 0 : value || 0;
  absValue = absValue > 0 ? absValue : 0;
  return absValue;
}
