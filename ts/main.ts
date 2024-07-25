import { DonationMidasBonus } from "./DonationMidasBonus";
import { DonationWheelsData } from "./DonationWheelsData";
import { getWheelPrice } from "./wheel_utils";
import {
  MIDAS_HAND_WHEEL_PRICE,
  WHEEL_COUNT_MAX,
  WHEEL_START_PRICE,
} from "./consts";

document
  .getElementById("check_button_uid")
  .addEventListener("click", function () {
    let donationAmount = document.getElementById<HTMLInputElement>(
      "donation_amount_uid"
    ).valueAsNumber;

    let currWheelsCount = document.getElementById<HTMLInputElement>(
      "curr_donation_wheels_count_uid"
    ).valueAsNumber;

    let donationData = calculateWheelsCount(donationAmount, currWheelsCount);

    document.getElementById<HTMLInputElement>("wheels_count_uid").value =
      donationData.wheelsCount.toString();
    document.getElementById<HTMLInputElement>("donation_change_uid").value =
      donationData.donationChange.toString();
    document.getElementById<HTMLInputElement>("next_wheel_price_uid").value =
      donationData.nextWheelPrice.toString();
  });

document.addEventListener("DOMContentLoaded", setNextWheelPrice);

document
  .getElementById("curr_donation_wheels_count_uid")
  .addEventListener("change", setNextWheelPrice);
document
  .getElementById("midas_uid")
  .addEventListener("change", setNextWheelPrice);

function calculateWheelsCount(
  inDonationAmount: number,
  inCurrWheelsCount: number
) {
  let midas = new DonationMidasBonus(isMidasActive());

  let donationLeft = inDonationAmount;
  let wheelsCount = inCurrWheelsCount;

  let wheelPrice = midas.tryUseCharges()
    ? MIDAS_HAND_WHEEL_PRICE
    : getWheelPrice(wheelsCount + 1);

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

function isMidasActive() {
  return document.getElementById<HTMLInputElement>("midas_uid").checked;
}

function setNextWheelPrice() {
  let wheelsCount = document.getElementById<HTMLInputElement>(
    "curr_donation_wheels_count_uid"
  ).valueAsNumber;

  wheelsCount = wheelsCount % WHEEL_COUNT_MAX;

  let nextWheelPrice = isMidasActive()
    ? MIDAS_HAND_WHEEL_PRICE
    : getWheelPrice(wheelsCount + 1);

  document.getElementById<HTMLInputElement>("next_wheel_price_uid").value =
    nextWheelPrice.toString();
}
