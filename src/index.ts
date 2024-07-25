let checkButtonElem = document.getElementById<HTMLInputElement>("check_button_uid");
let donationAmountElem = document.getElementById<HTMLInputElement>("donation_amount_uid");
let currWheelsCountElem = document.getElementById<HTMLInputElement>("curr_donation_wheels_count_uid");
let wheelCountElem = document.getElementById<HTMLInputElement>("wheels_count_uid");
let donationChangeElem = document.getElementById<HTMLInputElement>("donation_change_uid");
let nextWheelPriceElem = document.getElementById<HTMLInputElement>("next_wheel_price_uid");
let midasElem = document.getElementById<HTMLInputElement>("midas_uid");

checkButtonElem.addEventListener("click", function () {
  let donationAmount = donationAmountElem.valueAsNumber;
  let currWheelsCount = currWheelsCountElem.valueAsNumber;

  let donationData = calculateWheelsCount(donationAmount, currWheelsCount);

  wheelCountElem.value = donationData.wheelsCount.toString();
  donationChangeElem.value = donationData.donationChange.toString();
  nextWheelPriceElem.value = donationData.nextWheelPrice.toString();
});

document.addEventListener("DOMContentLoaded", setNextWheelPrice);

currWheelsCountElem.addEventListener("change", setNextWheelPrice);
midasElem.addEventListener("change", setNextWheelPrice);

function calculateWheelsCount(inDonationAmount: number, inCurrWheelsCount: number) {
  let midas = new DonationMidasBonus(isMidasActive());

  let donationLeft = inDonationAmount;
  let wheelsCount = inCurrWheelsCount;

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

function isMidasActive() {
  return midasElem.checked;
}

function setNextWheelPrice() {
  let wheelsCount = currWheelsCountElem.valueAsNumber;

  wheelsCount = wheelsCount % WHEEL_COUNT_MAX;

  let nextWheelPrice = isMidasActive() ? MIDAS_HAND_WHEEL_PRICE : getWheelPrice(wheelsCount + 1);
  nextWheelPriceElem.value = nextWheelPrice.toString();
}

function getWheelPrice(wheelCount: number) {
  if (wheelCount <= WHEEL_COUNT_MAX) {
    return WHEEL_START_PRICE + (wheelCount - 1) * WHEEL_PRICE_INCREMENT;
  }

  return WHEEL_START_PRICE + (wheelCount - WHEEL_COUNT_MAX - 1) * WHEEL_PRICE_INCREMENT;
}

class DonationWheelsData {
  wheelsCount: number;
  donationChange: number;
  nextWheelPrice: number;

  constructor(wheelsCount: number, donationChange: number, nextWheelPrice: number) {
    this.wheelsCount = wheelsCount;
    this.donationChange = this.tryGetDonationChangeValue(donationChange);
    this.nextWheelPrice = nextWheelPrice;
  }

  tryGetDonationChangeValue(inDonationChange: number) {
    return inDonationChange;
  }
}

class DonationMidasBonus {
  maxCharges: number;
  currentCharges: number;

  constructor(isActive: boolean) {
    if (isActive) {
      this.maxCharges = MIDAS_HAND_START_CHARGES;
    } else {
      this.maxCharges = 0;
    }

    this.currentCharges = this.maxCharges;
  }

  tryUseCharges(): boolean {
    if (this.currentCharges == 0) {
      return false;
    }

    return this.currentCharges-- > 0;
  }

  hasCharges(): boolean {
    return this.currentCharges > 0;
  }

  getChargesSpent(): number {
    return this.maxCharges - this.currentCharges;
  }
}

const WHEEL_START_PRICE = 500;
const WHEEL_PRICE_INCREMENT = 500;
const WHEEL_COUNT_MAX = 35;
const MIDAS_HAND_WHEEL_PRICE = 1500;
const MIDAS_HAND_START_CHARGES = 3;
