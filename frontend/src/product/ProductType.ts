import type PriceType from '../product-price/PriceType'

export default interface ProductType {
  id: number
  name: string
  imageLink: string
  price: PriceType
}
