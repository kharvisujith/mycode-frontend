import { Basket } from "../../models/basket";
import { useState } from 'react';
import { useEffect } from 'react';
import agent from './../../api/agent';
import LoadingComponent from "../../Layouts/LoadingComponent";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const BasketPage = ()=> {
    const [loading, setLoading] = useState(true)
    const [basket, setBasket] = useState<Basket>()


    useEffect(()=>{
        agent.basket.get()
        .then(data => setBasket(data))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false))
    },[])

    if(loading) return <LoadingComponent/>

    if(!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return(
        <>
        <TableContainer component={Paper}> 
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        basket.items.map(item => (
                            <TableRow key={item.productId}> 
                                <TableCell>{item.name}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${(item.price * item.quantity)}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </TableContainer>

        </>
    )
    

}

export default BasketPage