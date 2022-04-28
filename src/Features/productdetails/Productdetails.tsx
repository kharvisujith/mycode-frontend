import { Divider, Grid, TableContainer,Table,TableBody,TableRow,TableCell, Typography } from "@mui/material"
import { Box, height } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Products } from "../../models/Products"
import agent from '../../api/agent'
import LoadingComponent from "../../Layouts/LoadingComponent"

const Productdetials = ()=>{
    const {id} = useParams<{id:string}>()
    const [prod, setprod] = useState<Products>()
    // const arrdata = [{title:'Name', val:`${prod?.name}`,
    //                  {title:'Brand', val:`${prod?.brand}`,
    //                  {title:'Seller', val:`${prod?.seller}`,
    //                  {title:'In Stock', val:`${prod?.stock}`
    //                 ]
    // const kk = [{name:'suu',val:'kdfk'},{name:'sjf'}]

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
            // console.log("called useeffec in product details")

            //  fetch(`https://localhost:44323/api/products/${id}`)
            // .then(res => res.json())
            // .then(data=> setprod(data))

            agent.catalog.details(parseInt(id))
            .then(data =>setprod(data))
            .catch(error=> console.log(error))
            .finally(()=> setLoading(false))


            // const val = data.filter((cur)=>{
            //     return( cur.id.toString() === id)
            // })
            // setprod(val[0])

    },[id])

    if(loading) return <LoadingComponent />

    return(
        <>
        <Grid container>
            <Grid item sm={6} width='100%' display='flex' justifyContent='center'  >
                <img src={prod?.pictureUrl} alt={prod?.name} style={{height:400}}  />
            </Grid>
            <Grid item sm={6}>
                <Typography variant='h4' color='primary.main' fontWeight='bold'>{prod?.name.toUpperCase()}</Typography>
                <Divider />
            
                <Typography variant='h5' color='primary.main' fontWeight='bold' sx={{my:2}}>${prod?.price?.toFixed(2)}</Typography>
                <Divider />

                <TableContainer>
                    <Table>
                        <TableBody sx={{textTransform:'capitalize'}}>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    {prod?.name}
                                </TableCell>
                            </TableRow>
                        
                            <TableRow>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell>
                                    {prod?.description}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Type 
                                </TableCell>
                                <TableCell>
                                    {prod?.type} 
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Brand 
                                </TableCell>
                                <TableCell>
                                    {prod?.brand} 
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    In Stock
                                </TableCell>
                                <TableCell>
                                    {prod?.quantityInStock}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>
        
        </>
    )
}

export default Productdetials