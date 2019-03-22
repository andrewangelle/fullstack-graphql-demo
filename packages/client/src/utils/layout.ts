import { useState, useEffect, useMemo } from "react";

export function useSubscription(
  subscribe: (handler: any) => void,
  unsubscribe: (handler: any) => void,
  getValue: Function
) {
  const [state, set] = useState(getValue());

  useEffect(() => {
    const handleChange = () => set(getValue())
    subscribe(handleChange)
    return () => unsubscribe(handleChange)
  })

  return state
}

export function useWindowWidth() {
  const width = useSubscription(
    subscribe => window.addEventListener('resize', subscribe),
    unsubscribe => window.removeEventListener('resize', unsubscribe),
    () => window.innerWidth
  );

  return width
}

export function calcBreakpt(width: number) {
  console.log(width)
  if (width > 1280) {
    return 'xl'
  }
  if ((width <= 1280) && (width > 980)) {
    return 'lg'
  }
  if ((width <= 980) && (width > 736)) {
    return 'md'
  }
  if ((width <= 736) && (width > 500)) {
    return 'sm'
  }
  return 'xs'
}


export function useBreakpoint() {
  const width = useWindowWidth();
  const breakpoint = calcBreakpt(width);
  return useMemo(() => breakpoint, [breakpoint])
}

