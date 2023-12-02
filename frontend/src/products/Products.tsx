import React, { useState } from 'react'
import './Products.css'
import Product from '../product/Product'
import type ProductType from '../product/ProductType'

const Products: any = () => {
  const initialState: ProductType[] = [
    { id: 1, name: 'Light chocolate Coins', price: { discount: null, price: 30.99, priceAfterDiscount: 30.99, currency: '€' }, imageLink: '/logo192.png' },
    { id: 2, name: 'Focus Pro', price: { discount: null, price: 30.99, priceAfterDiscount: 30.99, currency: '€' }, imageLink: '/logo192.png' },
    { id: 3, name: 'Protein Powder double chocolate', price: { discount: null, price: 30.99, priceAfterDiscount: 30.99, currency: '€' }, imageLink: '/logo192.png' },
    { id: 4, name: 'ESN Hoodie', price: { discount: 50, price: 30.99, priceAfterDiscount: 15.49, currency: '€' }, imageLink: '/logo192.png' },
    { id: 5, name: 'Trial package', price: { discount: null, price: 30.99, priceAfterDiscount: 30.99, currency: '€' }, imageLink: '/logo192.png' }
  ]
  const [products] = useState(initialState)
  return (
    <div className="Products">
        {products.map(product =>
            <Product
                key={product.id}
                productDetails={product}
            ></Product>
        )}
    </div>
  )
}

export default Products
