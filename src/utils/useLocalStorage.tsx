import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const getStorageValue = (key: any, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultValue;
  }
}

const getStorageValueJWT = (key: any, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      return jwtDecode(saved);
    }
    return defaultValue;
  }
}


const useLocalStorage = (key: any, defaultValue: any, type = "normal") => {
  const [value, setValue] = useState(() => {
    if(type === "jwt") {
      return getStorageValueJWT(key, defaultValue)
    } else {
      return getStorageValue(key, defaultValue);
    }
  });
 
  useEffect(() => {
    if(type === "normal") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  if(value === null) {
    localStorage.removeItem(key)
  }

  return [value, setValue];
};

export default useLocalStorage