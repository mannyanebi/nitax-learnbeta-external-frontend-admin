import CryptoJS from 'crypto-js';

const KEY = process.env.REACT_APP_ENCRYPTION_KEY;

export function encryptData(data: any): string {
  const dataString: string = JSON.stringify(data);
  const encryptedData: string = KEY ? CryptoJS.AES.encrypt(dataString, KEY).toString() : '';

  return encryptedData;
}

export function decryptData(encryptedData: string): any {
  const decryptedData: string = KEY ? CryptoJS.AES.decrypt(encryptedData, KEY).toString(CryptoJS.enc.Utf8) : '';
  const data: any = JSON.parse(decryptedData);
  
  return data;
}
