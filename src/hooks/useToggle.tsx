import useLocalStorage from "./useLocalStorage"

const useToggle = (
  key: string,
  initValue: boolean
): [typeof value, typeof toggle] => {
  const [value, setValue] = useLocalStorage(key, initValue)

  const toggle = () => {
    setValue((prev) => !prev)
  }

  return [value, toggle]
}
export default useToggle
