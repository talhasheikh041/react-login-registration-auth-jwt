import { useState, useEffect } from "react"

const getLocalValue = (key: string, initValue: typeof Function | any) => {
  // SSR Next.js
  if (typeof window === "undefined") return initValue

  // if a value is already stored
  const localValue = JSON.parse(localStorage.getItem(key) as string)
  if (localValue) return localValue

  // return result of a function
  if (initValue instanceof Function) return initValue()

  return initValue
}

type MyType = string

const useLocalStorage = <T extends MyType, K>(
  key: T,
  initValue: K
): [K, React.Dispatch<React.SetStateAction<K>>] => {
  const [value, setValue] = useState<K>(() => {
    return getLocalValue(key, initValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
