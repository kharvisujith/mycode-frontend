import { Basket } from "../../models/basket";
import { useState } from 'react';
import { useEffect } from 'react';
import agent from './../../api/agent';
import LoadingComponent from "../../Layouts/LoadingComponent";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, FlashOnRounded, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../context/StoreContext";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { grid } from "@mui/system";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {  addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";
const BasketPage = ()=> {
    //const [loading, setStatus] = useState(true)
    // const {basket, setBasket, removeItem} = useStoreContext()

    const dispatch = useAppDispatch()
    const {basket, status} = useAppSelector((state)=> state.basket)

    
    
    // const [basket, setBasket] = useState<Basket>()


    // useEffect(()=>{
    //     agent.basket.get()
    //     .then(data => setBasket(data))
    //     .catch(error => console.log(error))
    //     .finally(()=>setStatus(false))
    // },[])

   // if(loading) return <LoadingComponent/>

   

    if(!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return(
        <>
        <TableContainer component={Paper}> 
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >Product</TableCell>
                        <TableCell >Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell >Subtotal</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        basket.items.map(item => (
                            <TableRow key={item.productId}> 
                            
                                <TableCell>
                                <Box display='flex' alignItems='center'>
                                <img src={item.pictureUrl} alt={item.name} style={{height:40, marginRight:20}} />
                                <span>{item.name}</span>
                                </Box>
                                </TableCell>

                            
                            
                                <TableCell>${(item.price/100).toFixed(2)}</TableCell>
                                <TableCell>
                                    {/* <Box display='flex' alignItems='center'> */}
                                        <LoadingButton loading={ status === ('pendingRemoveItem'+item.productId+'rem')} 
                                        onClick={()=> dispatch(removeBasketItemAsync({productId:item.productId, quantity:1 , name:'rem'}))} color='error'>
                                            <Remove />
                                        </LoadingButton  >
                                        <span>{item.quantity}</span>
                                        <LoadingButton
                                         loading={status === ('pendingAddItem' + item.productId)} 
                                        onClick = {()=> dispatch(addBasketItemAsync({productId:item.productId}))} color='secondary'>
                                            <Add/>
                                        </LoadingButton>
                                    {/* </Box> */}
                                    </TableCell>
                                <TableCell>${((item.price/100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell>
                                    <LoadingButton loading={status === ('pendingRemoveItem' + item.productId + 'del')}
                                     onClick ={()=> dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity, name:'del'}))}color="error">
                                        <Delete />
                                    </LoadingButton>

                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </TableContainer>

        <Grid container>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
                <BasketSummary/>
                <Button 
                variant='contained'
                fullWidth
                component={Link}
                to={'/checkout'}
                > Check Out</Button>
            </Grid>
        </Grid>

        </>
    )
    

}

export default BasketPage