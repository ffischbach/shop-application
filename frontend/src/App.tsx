import React from 'react'
import './App.css'
import Products from './products/Products'

const App: any = () => {
  return (
    <div className="App">
        <h1 className="App-Header">
            Our Products
        </h1>
        <div className="App-Body">
            <Products />
        </div>
    </div>
  )
}

export default App
