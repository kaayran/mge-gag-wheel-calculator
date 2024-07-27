export function animateElement(element, currValue, targetValue) {
  let step = Math.ceil(Math.abs(targetValue - currValue) / 100);
  const increment = () => {
    if (currValue < targetValue) {
      currValue += step;
      if (currValue > targetValue)
        currValue = targetValue;
      element.value = currValue.toString();
      requestAnimationFrame(increment);
    } else if (currValue > targetValue) {
      currValue -= step;
      if (currValue < targetValue)
        currValue = targetValue;
      element.value = currValue.toString();
      requestAnimationFrame(increment);
    } else {
      element.textContent = targetValue.toString();
    }
  };
  increment();
}
