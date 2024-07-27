export function animateElement(element: HTMLInputElement, currValue: number, targetValue: number) {
  let step = Math.ceil(Math.abs(targetValue - currValue) / 100);

  const increment = () => {
    if (currValue < targetValue) {
      currValue += step;
      if (currValue > targetValue) currValue = targetValue;
      element.value = currValue.toString();
      requestAnimationFrame(increment);
    } else if (currValue > targetValue) {
      currValue -= step;
      if (currValue < targetValue) currValue = targetValue;
      element.value = currValue.toString();
      requestAnimationFrame(increment);
    } else {
      element.textContent = targetValue.toString();
    }
  };

  increment();
}
