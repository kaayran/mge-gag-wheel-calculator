"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWheelPrice = getWheelPrice;
require("./consts");
var consts_1 = require("./consts");
function getWheelPrice(wheelCount) {
    if (wheelCount <= consts_1.WHEEL_COUNT_MAX) {
        return consts_1.WHEEL_START_PRICE + (wheelCount - 1) * consts_1.WHEEL_PRICE_INCREMENT;
    }
    return (consts_1.WHEEL_START_PRICE +
        (wheelCount - consts_1.WHEEL_COUNT_MAX - 1) * consts_1.WHEEL_PRICE_INCREMENT);
}
//# sourceMappingURL=wheel_utils.js.map