import React from 'react';
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from "@material-ui/core"

import useStyles from "./index"

const CartItem = ({ item }) => {
    const classes = useStyles()
    return (
        <Card>
            <CardMedia alt={item.name} className={classes.media} image={item.media.source} />
            <CardContent>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
                <CardActions className={classes.cardActions}>
                    <div className={classes.buttons}>
                        <Button type="button" size="small">-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type="button" size="small">+</Button>
                    </div>
                    <Button variant="contained" type="button" color="secondary">Remove</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default CartItem;