import { useEffect } from "react";

export function initBuyButtonObserver() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buttonVisibilityListener);
      } else {
        buttonVisibilityListener();
      }
    } else {
      console.error("document is undefined");
    }
  }, []);
}

function buttonVisibilityListener() {
  const buyButton = document.getElementById("buyButton");
  const eventsList = document.getElementById("tickets");

  if (buyButton !== null && eventsList !== null) {
    toggleButtonVisibility(buyButton, eventsList);

    window.addEventListener("scroll", () => {
      toggleButtonVisibility(buyButton, eventsList);
    });
  }
}

function toggleButtonVisibility(button: HTMLElement, list: HTMLElement) {
  const productionInfo = document.getElementById("eventLabels");
  const listIsVisible = elementIsVisibleInViewPort(list, 200);
  const productionInfoIsVisible =
    productionInfo !== null
      ? elementIsVisibleInViewPort(productionInfo)
      : false;

  if (listIsVisible || productionInfoIsVisible) {
    button.style.opacity = "0";
  } else {
    button.style.opacity = "1";
  }
}

export function isWideScreen(): boolean {
  return window.innerWidth > 2000;
}

export function elementIsVisibleInViewPort(
  element: HTMLElement,
  optionalPixelDelay = 0
): boolean {
  const rect = element.getBoundingClientRect();

  if (!document.documentElement) {
    return false;
  }

  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top + optionalPixelDelay < viewportHeight &&
    rect.bottom + optionalPixelDelay > 0
  );
}
