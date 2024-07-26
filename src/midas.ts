import { MIDAS_HAND_START_CHARGES } from "./wheel-consts";

export class DonationMidasBonus {
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
