import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce"
import { Products, NavBar, Cart } from "./components"

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const response = await commerce.products.list()
        setProducts(response.data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    console.log(cart)

    console.log(products)

    return (
        <div>
            <NavBar totalItems={cart.total_items}/>
            <Products products={products} onAddToCart={handleAddToCart} />
            <Cart cart={cart} />
        </div>
    );
};

export default App;