export class DonationWheelsData {
  wheelsCount: number;
  donationLeft: number;
  nextWheelPrice: number;

  constructor(wheelsCount: number, donationLeft: number, nextWheelPrice: number) {
    this.wheelsCount = wheelsCount;
    this.donationLeft = donationLeft;
    this.nextWheelPrice = nextWheelPrice;
  }
}
