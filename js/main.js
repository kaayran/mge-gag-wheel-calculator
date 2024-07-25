"use strict";
var WHEEL_START_PRICE = 500;
var WHEEL_PRICE_INCREMENT = 500;
var WHEEL_COUNT_MAX = 35;
var MIDAS_HAND_WHEEL_PRICE = 1500;
var MIDAS_HAND_START_CHARGES = 3;
var DonationWheelsData = /** @class */ (function () {
    function DonationWheelsData(wheelsCount, donationChange, nextWheelPrice) {
        this.wheelsCount = wheelsCount;
        this.donationChange = this.tryGetDonationChangeValue(donationChange);
        this.nextWheelPrice = nextWheelPrice;
    }
    DonationWheelsData.prototype.tryGetDonationChangeValue = function (inDonationChange) {
        return inDonationChange;
    };
    return DonationWheelsData;
}());
var DonationMidasBonus = /** @class */ (function () {
    function DonationMidasBonus(isActive) {
        if (isActive) {
            this.maxCharges = MIDAS_HAND_START_CHARGES;
        }
        else {
            this.maxCharges = 0;
        }
        this.currentCharges = this.maxCharges;
    }
    DonationMidasBonus.prototype.tryUseCharges = function () {
        if (this.currentCharges == 0) {
            return false;
        }
        return this.currentCharges-- > 0;
    };
    DonationMidasBonus.prototype.hasCharges = function () {
        return this.currentCharges > 0;
    };
    DonationMidasBonus.prototype.getChargesSpent = function () {
        return this.maxCharges - this.currentCharges;
    };
    return DonationMidasBonus;
}());
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
    var midas = new DonationMidasBonus(isMidasActive());
    var donationLeft = inDonationAmount;
    var wheelsCount = inCurrWheelsCount;
    var wheelPrice = midas.tryUseCharges()
        ? MIDAS_HAND_WHEEL_PRICE
        : getWheelPrice(wheelsCount + 1);
    var wasLastMidasCharge = !midas.hasCharges();
    while (donationLeft >= wheelPrice) {
        wheelsCount++;
        donationLeft -= wheelPrice;
        if (midas.tryUseCharges()) {
            wheelPrice = MIDAS_HAND_WHEEL_PRICE;
        }
        else if (!wasLastMidasCharge) {
            wasLastMidasCharge = true;
            wheelPrice = WHEEL_START_PRICE;
        }
        else if (wasLastMidasCharge) {
            wheelPrice = getWheelPrice(wheelsCount + 1 - midas.getChargesSpent());
        }
    }
    return new DonationWheelsData(wheelsCount, donationLeft, wheelPrice);
}
function isMidasActive() {
    return document.getElementById("midas_uid").checked;
}
function getWheelPrice(wheelCount) {
    if (wheelCount <= WHEEL_COUNT_MAX) {
        return WHEEL_START_PRICE + (wheelCount - 1) * WHEEL_PRICE_INCREMENT;
    }
    return (WHEEL_START_PRICE +
        (wheelCount - WHEEL_COUNT_MAX - 1) * WHEEL_PRICE_INCREMENT);
}
function setNextWheelPrice() {
    var wheelsCount = document.getElementById("curr_donation_wheels_count_uid").valueAsNumber;
    wheelsCount = wheelsCount % WHEEL_COUNT_MAX;
    var nextWheelPrice = isMidasActive()
        ? MIDAS_HAND_WHEEL_PRICE
        : getWheelPrice(wheelsCount + 1);
    document.getElementById("next_wheel_price_uid").value =
        nextWheelPrice.toString();
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
//# sourceMappingURL=main.js.map