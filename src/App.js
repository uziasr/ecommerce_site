import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce"
import { Products, NavBar, Cart } from "./components"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

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

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart)
    }

    const handleRemoveCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }

    return (
        <Router>
            <div>
                <NavBar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveCart={handleRemoveCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;