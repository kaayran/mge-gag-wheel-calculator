import {animateElement} from "./animations.js";
import {
  donationAmountElem,
  currWheelsCountElem,
  wheelCountElem,
  donationLeftElem,
  nextWheelPriceElem,
  midasElem,
  isMidasActive
} from "./doc-utils.js";
import {calculateWheelsCount} from "./wheel.js";
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
function getValidInputValue(value, round = true) {
  let absValue = round ? Math.floor(value) || 0 : value || 0;
  absValue = absValue > 0 ? absValue : 0;
  return absValue;
}
