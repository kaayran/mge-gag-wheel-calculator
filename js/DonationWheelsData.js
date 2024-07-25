"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationWheelsData = void 0;
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
exports.DonationWheelsData = DonationWheelsData;
//# sourceMappingURL=DonationWheelsData.js.map