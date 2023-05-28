import cookie from "cookiejs";
import { encryptData, decryptData } from "./encryption";

export function setCookieItem(key: string, value: any) {
  cookie.set(key, encryptData(value), 1)  
}

export function getCookieItem(key: string) {
  const value = cookie.get(key);

  if(typeof value === 'string'){
    return decryptData(value)
  }
  return null;
}