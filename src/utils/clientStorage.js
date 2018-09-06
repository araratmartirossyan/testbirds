import { keys } from 'ramda'

export const setItemsToStorage = items => {
  const itemsKeys = keys(items)
  itemsKeys.map(item =>
    localStorage.setItem([item], JSON.stringify(items[item]))
  )
}
export const getItemFromStorage = key => JSON.parse(localStorage.getItem(key))

export const setItemToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const removeItemFromStorage = key => localStorage.removeItem(key)

export const removeItemsFromStorage = items =>
  keys(items).map(item => localStorage.removeItem(item))
