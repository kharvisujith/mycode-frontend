import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useStoreContext } from "../../context/StoreContext";
import { useAppSelector } from "../../store/configureStore";
import { currencyFormat } from "../../util/util";

export default function BasketSummary() {
    const {basket} = useAppSelector((state)=>state.basket)
    const subtotal = basket?.items.reduce((prevValue, curValue) => prevValue+ (curValue.price* curValue.quantity), 0) ?? 0
    console.log(subtotal)
    //const subtotal = 0
    const deliveryFee = subtotal>1000 ? 0 : 500

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">${subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}