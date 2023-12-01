import React from 'react'
import ProductsService from './Products.service'

const Products: any = () => {
  const products: string = ProductsService.getProducts()
  return (
    <div className="Products">
      <h1>Products 2</h1>
        <p>{ products }</p>
    </div>
  )
}

export default Products
