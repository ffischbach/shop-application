import React, { useState } from 'react'
import type PriceType from './PriceType'

const Product: React.FC<{ price: PriceType }> = (props) => {
  const pricingDetails: PriceType = props.price

  const [withoutDiscount] = useState(pricingDetails.discount === null)

  const Price: React.FC<{ pricing: PriceType }> = (props) => {
    return (
            <div className="product-price-container">
                <span className="product-price">{props.pricing.price}{props.pricing.currency}*</span>
            </div>
    )
  }

  const DiscountedPrice: React.FC<{ pricing: PriceType }> = (props) => {
    return (
          <div className="product-price-container">
              <span className="product-price crossed-out">UVP: {props.pricing.price}{props.pricing.currency}*</span>
              <div className="discount-container">
                  <span className="discounted-price">{props.pricing.priceAfterDiscount}{props.pricing.currency}*</span>
                  <div className="discount-badge">
                      <span className="discount-badge-text">-{props.pricing.discount} %</span>
                  </div>
              </div>
          </div>
    )
  }

  return (
        <div>
            {(() => {
              if (withoutDiscount) {
                return <Price pricing={pricingDetails} />
              } else {
                return <DiscountedPrice pricing={pricingDetails}/>
              }
            })()}
        </div>
  )
}

export default Product
