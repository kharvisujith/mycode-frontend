import { LoadingButton } from "@mui/lab";
import {Card, CardMedia,CardContent,Typography,CardActions,CardHeader,Button, Avatar} from "@mui/material"
import { useState } from "react";
import { NavLink,Link } from "react-router-dom"

import { Products } from "../../models/Products"
import agent from './../../api/agent';

export interface Props{
    product:Products
}






const ProductCard = ({product}:Props)=>{

  const [loading, setLoading] = useState(false)

  const handleAddItem = (productId : number, quantity:number)=>{
    console.log("dkdsjdj")
    setLoading(true)
    agent.basket.addItem(productId, quantity)
    .then(data => console.log("this should see"))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))
  }


    return(
    <Card >

      <CardHeader 
            avatar={
                <Avatar >
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
            subheader="keek"
            titleTypographyProps={{
                sx:{fontWeight:'bold',color:'primary.main', textTransform:'capitalize'}
            }}
        
        />



      <CardMedia 
        sx={{height:140, backgroundSize:"contain",backgroundColor:"primary.main"}}
        image={product.pictureUrl}
        />


      <CardContent>
        <Typography gutterBottom variant="h5">
          ${product.price?.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.brand}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button  onClick={()=> handleAddItem(product.id)}  size="small"   sx={{fontWeight:'bold'}}>Add to Cart</Button> */}
        <LoadingButton
        loading = {loading}
        onClick={()=> handleAddItem(product.id, 2) } 
        size = "small" 
        sx={{fontWeight:'bold'}}

        >Add to Cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`}  size="small" sx={{fontWeight:'bold'}}>View</Button>
      </CardActions>
    </Card>
    )
}
export default ProductCard