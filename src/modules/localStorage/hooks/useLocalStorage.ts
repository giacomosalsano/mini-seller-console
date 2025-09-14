import { useState, useEffect } from "react";

// This hook uses a simpler and more straightforward approach compared to others in the project.

function getValueFromLocalStorage<T>(key: string, initialValue: T): T {
  const savedValue = window.localStorage.getItem(key);
  if (savedValue) {
    try {
      return JSON.parse(savedValue);
    } catch (error) {
      console.error("Error parsing JSON from localStorage", error);
      return initialValue;
    }
  }
  return initialValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return getValueFromLocalStorage(key, initialValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
