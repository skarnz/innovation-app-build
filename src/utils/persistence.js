// Utility functions for persisting state using browser storage

/**
 * Saves a value to localStorage.
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to store (will be JSON.stringify'd).
 */
export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
  }
};

/**
 * Loads a value from localStorage.
 * @param {string} key - The key of the item to retrieve.
 * @param {any} defaultValue - The value to return if the key is not found or an error occurs.
 * @returns {any} The loaded value or the defaultValue.
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error loading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
};

/**
 * Removes a value from localStorage.
 * @param {string} key - The key of the item to remove.
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
  }
};

// Placeholder for IndexedDB functions - to be implemented if needed
// export const saveToIndexedDB = async (storeName, data) => { ... };
// export const loadFromIndexedDB = async (storeName, key) => { ... };
// export const removeFromIndexedDB = async (storeName, key) => { ... }; 