"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DonationMidasBonus_1 = require("./DonationMidasBonus");
var DonationWheelsData_1 = require("./DonationWheelsData");
var wheel_utils_1 = require("./wheel_utils");
var consts_1 = require("./consts");
document
    .getElementById("check_button_uid")
    .addEventListener("click", function () {
    var donationAmount = document.getElementById("donation_amount_uid").valueAsNumber;
    var currWheelsCount = document.getElementById("curr_donation_wheels_count_uid").valueAsNumber;
    var donationData = calculateWheelsCount(donationAmount, currWheelsCount);
    document.getElementById("wheels_count_uid").value =
        donationData.wheelsCount.toString();
    document.getElementById("donation_change_uid").value =
        donationData.donationChange.toString();
    document.getElementById("next_wheel_price_uid").value =
        donationData.nextWheelPrice.toString();
});
document.addEventListener("DOMContentLoaded", setNextWheelPrice);
document
    .getElementById("curr_donation_wheels_count_uid")
    .addEventListener("change", setNextWheelPrice);
document
    .getElementById("midas_uid")
    .addEventListener("change", setNextWheelPrice);
function calculateWheelsCount(inDonationAmount, inCurrWheelsCount) {
    var midas = new DonationMidasBonus_1.DonationMidasBonus(isMidasActive());
    var donationLeft = inDonationAmount;
    var wheelsCount = inCurrWheelsCount;
    var wheelPrice = midas.tryUseCharges()
        ? consts_1.MIDAS_HAND_WHEEL_PRICE
        : (0, wheel_utils_1.getWheelPrice)(wheelsCount + 1);
    var wasLastMidasCharge = !midas.hasCharges();
    while (donationLeft >= wheelPrice) {
        wheelsCount++;
        donationLeft -= wheelPrice;
        if (midas.tryUseCharges()) {
            wheelPrice = consts_1.MIDAS_HAND_WHEEL_PRICE;
        }
        else if (!wasLastMidasCharge) {
            wasLastMidasCharge = true;
            wheelPrice = consts_1.WHEEL_START_PRICE;
        }
        else if (wasLastMidasCharge) {
            wheelPrice = (0, wheel_utils_1.getWheelPrice)(wheelsCount + 1 - midas.getChargesSpent());
        }
    }
    return new DonationWheelsData_1.DonationWheelsData(wheelsCount, donationLeft, wheelPrice);
}
function isMidasActive() {
    return document.getElementById("midas_uid").checked;
}
function setNextWheelPrice() {
    var wheelsCount = document.getElementById("curr_donation_wheels_count_uid").valueAsNumber;
    wheelsCount = wheelsCount % consts_1.WHEEL_COUNT_MAX;
    var nextWheelPrice = isMidasActive()
        ? consts_1.MIDAS_HAND_WHEEL_PRICE
        : (0, wheel_utils_1.getWheelPrice)(wheelsCount + 1);
    document.getElementById("next_wheel_price_uid").value =
        nextWheelPrice.toString();
}
//# sourceMappingURL=main.js.map