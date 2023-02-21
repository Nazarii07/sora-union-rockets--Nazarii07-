export const getLocalStorage = (key: string): [] => {
    return JSON.parse(localStorage.getItem(key) ?? "[]") 
}

export const setLocalStorage = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data)) 
}
