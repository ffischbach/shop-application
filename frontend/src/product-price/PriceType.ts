export default interface PriceType {
  discount: number | null
  price: number
  priceAfterDiscount: number
  currency: string
}
