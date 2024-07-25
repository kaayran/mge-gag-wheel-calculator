export class DonationWheelsData {
  wheelsCount: number;
  donationChange: number;
  nextWheelPrice: number;

  constructor(
    wheelsCount: number,
    donationChange: number,
    nextWheelPrice: number
  ) {
    this.wheelsCount = wheelsCount;
    this.donationChange = this.tryGetDonationChangeValue(donationChange);
    this.nextWheelPrice = nextWheelPrice;
  }

  tryGetDonationChangeValue(inDonationChange: number) {
    return inDonationChange;
  }
}
