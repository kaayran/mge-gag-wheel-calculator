import {DonationWheelsData} from "./donation.js";
import {DonationMidasBonus} from "./midas.js";
import {MIDAS_HAND_WHEEL_PRICE, WHEEL_COUNT_MAX, WHEEL_PRICE_INCREMENT, WHEEL_START_PRICE} from "./wheel-consts.js";
export function getWheelPrice(wheelCount) {
  wheelCount = Math.floor(wheelCount);
  let actualWheelCount = (wheelCount - 1) % WHEEL_COUNT_MAX + 1;
  return WHEEL_START_PRICE + (actualWheelCount - 1) * WHEEL_PRICE_INCREMENT;
}
export function calculateWheelsCount(inDonation, inCurrWheelsCount, useMidas) {
  let midas = new DonationMidasBonus(useMidas);
  let donationLeft = inDonation;
  let wheelsCount = Math.floor(inCurrWheelsCount);
  let wheelPrice = midas.tryUseCharges() ? MIDAS_HAND_WHEEL_PRICE : getWheelPrice(wheelsCount + 1);
  let wasLastMidasCharge = !midas.hasCharges();
  while (donationLeft >= wheelPrice) {
    wheelsCount++;
    donationLeft -= wheelPrice;
    if (midas.tryUseCharges()) {
      wheelPrice = MIDAS_HAND_WHEEL_PRICE;
    } else if (!wasLastMidasCharge) {
      wasLastMidasCharge = true;
      wheelPrice = WHEEL_START_PRICE;
    } else if (wasLastMidasCharge) {
      wheelPrice = getWheelPrice(wheelsCount + 1 - midas.getChargesSpent());
    }
  }
  return new DonationWheelsData(wheelsCount, donationLeft, wheelPrice);
}
