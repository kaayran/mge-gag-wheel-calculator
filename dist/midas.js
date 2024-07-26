import {MIDAS_HAND_START_CHARGES} from "./wheel-consts.js";
export class DonationMidasBonus {
  constructor(isActive) {
    if (isActive) {
      this.maxCharges = MIDAS_HAND_START_CHARGES;
    } else {
      this.maxCharges = 0;
    }
    this.currentCharges = this.maxCharges;
  }
  tryUseCharges() {
    if (this.currentCharges == 0) {
      return false;
    }
    return this.currentCharges-- > 0;
  }
  hasCharges() {
    return this.currentCharges > 0;
  }
  getChargesSpent() {
    return this.maxCharges - this.currentCharges;
  }
}
