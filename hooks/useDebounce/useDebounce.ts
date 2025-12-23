import { DependencyList, useEffect } from "react";
import useTimeoutFn from "../useTimeout/useTimeout";

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce(
  fn: () => void,
  ms: number,
  deps: DependencyList = []
): UseDebounceReturn {
  const { isReady, clear, set } = useTimeoutFn(fn, ms);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(set, deps);

  return [isReady, clear];
}
