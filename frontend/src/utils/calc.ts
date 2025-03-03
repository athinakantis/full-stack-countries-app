export const calculateTotalPages = (arrayLength: number, pageItems: number = 10) => {
  return Math.ceil(arrayLength / pageItems)
}