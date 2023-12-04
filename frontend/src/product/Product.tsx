import React from 'react'
import type ProductType from './ProductType'
import './Product.css'
import ProductPrice from '../product-price/ProductPrice'

const Product: React.FC<{ productDetails: ProductType }> = (props) => {
  const details: ProductType = props.productDetails
  return (
    <div className="product">
        <img className="limited-badge" src="/limited-icon.png"/>
        <img className="product-image" src={details.imageLink}/>
        <p className="product-name">{ details.name }</p>
        <ProductPrice price={details.price}/>
        <div className="btn-container">
            <button className="show-details-btn btn">DETAILS ANSEHEN</button>
            <button className="add-to-cart btn">
                <img className="add-to-cart" src='/cart.svg'/>
            </button>
        </div>
    </div>
  )
}

export default Product
