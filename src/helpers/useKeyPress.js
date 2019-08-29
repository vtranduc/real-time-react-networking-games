import { useEffect, useState } from "react";

export default function useKeyPress(targetKey) {
  const [key, setKey] = useState(false);
  const downHandler = function({ key }) {
    if (targetKey === key) {
      setKey(true);
    }
  };
  const upHandler = function({ key }) {
    if (targetKey === key) {
      setKey(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    };
  }, []);
  return key;
}
