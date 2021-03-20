import React from 'react';
import { Container, Typography, Button, Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import useStyles from "./styles"
import CartItem from './cartItem/CartItem';

const Cart = ({ cart, handleEmptyCart, handleRemoveCart, handleUpdateCartQty }) => {
    const isEmpty = cart.line_items ? !cart.line_items.length : null;

    const classes = useStyles()

    const EmptyCart = () => (<Typography variant="subtitle1">You have no items in your shopping cart, <Link className={classes.link} to="/">start adding some!</Link></Typography>)

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem 
                            onRemoveCart={handleRemoveCart} 
                            onUpdateCart={handleUpdateCartQty}  
                            item={item} 
                        />
                    </Grid>
                ))}
                <div className={classes.cardDetails}>
                    <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} color="secondary" size="large" type="button" variant="contained" onClick={handleEmptyCart}>Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} color="primary" size="large" type="button" variant="contained">Checkout</Button>
                    </div>
                </div>
            </Grid>
        </>
    )

    return Object.keys(cart).length ? (
        <Container>
            <div className={classes.toolbar} />
            <Typography gutterBottom className={classes.title} variant="h3">Your Shopping Cart</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    ) : null;
};

export default Cart;