export const getLocalStorage = (key: string): [] => {
    return JSON.parse(localStorage.getItem(key) ?? "[]") 
}

export const setLocalStorage = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data)) 
}

export const randomImage = (imageCount: number) => {
  const randomNumber = Math.floor(Math.random() * imageCount) + 1
  return `http://localhost:3000/image/Rocket-${randomNumber}.png`
}