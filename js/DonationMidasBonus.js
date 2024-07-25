"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationMidasBonus = void 0;
var consts_1 = require("./consts");
var DonationMidasBonus = /** @class */ (function () {
    function DonationMidasBonus(isActive) {
        if (isActive) {
            this.maxCharges = consts_1.MIDAS_HAND_START_CHARGES;
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
exports.DonationMidasBonus = DonationMidasBonus;
//# sourceMappingURL=DonationMidasBonus.js.map