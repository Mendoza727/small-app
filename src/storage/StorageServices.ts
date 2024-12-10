import CryptoJS from "crypto-js";

const SECRECT_KEY = "1af19fd1fd907d52bd22218dc553526bca52da81";

export const encryptData = (data: string | object) => {
  // Si `data` es un objeto, lo convertimos a JSON (cadena)
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringData, SECRECT_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRECT_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  try {
    // Intentamos convertirlo a un objeto, si era un objeto originalmente
    return JSON.parse(decryptedString);
  } catch (e) {
    // Si no se puede parsear, simplemente devolvemos la cadena
    return decryptedString;
  }
};

// Función para guardar datos cifrados en localStorage
export const setEncryptedLocalStorage = (key: string, data: any) => {
  const encryptedData = encryptData(data);
  localStorage.setItem(key, encryptedData);
};

// Función para obtener datos cifrados desde localStorage
export const getEncryptedLocalStorage = (key: string) => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
};

// Función para guardar datos cifrados en sessionStorage
export const setEncryptedSessionStorage = (key: string, data: string) => {
  const encryptedData = encryptData(data);
  sessionStorage.setItem(key, encryptedData);
};

// Función para obtener datos cifrados desde sessionStorage
export const getEncryptedSessionStorage = (key: string) => {
  const encryptedData = sessionStorage.getItem(key);
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
};
