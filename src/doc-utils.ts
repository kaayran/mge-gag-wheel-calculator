export let checkButtonElem = document.getElementById<HTMLInputElement>("check_button_uid");
export let donationAmountElem = document.getElementById<HTMLInputElement>("donation_amount_uid");
export let currWheelsCountElem = document.getElementById<HTMLInputElement>("curr_donation_wheels_count_uid");
export let wheelCountElem = document.getElementById<HTMLInputElement>("wheels_count_uid");
export let donationLeftElem = document.getElementById<HTMLInputElement>("donation_change_uid");
export let nextWheelPriceElem = document.getElementById<HTMLInputElement>("next_wheel_price_uid");
export let midasElem = document.getElementById<HTMLInputElement>("midas_uid");

export function isMidasActive() {
  return midasElem.checked;
}
