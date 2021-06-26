export const saveToLocal = (key, value) => window.localStorage.setItem(key, value);//Guardar
export const getFromLocal = (key) => window.localStorage.getItem(key);//Sacar
export const removeFromLocal = (key) => window.localStorage.removeItem(key);//Borrar