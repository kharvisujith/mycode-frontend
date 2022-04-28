import { Grid, List } from "@mui/material";
import ProductCard from "./ProductCard";
import {Products} from '../../models/Products'


export interface Props{
  products:Products[]
}


const ProductList = ({products}:Props)=>{
  return(
    <Grid container spacing={4}  >
      {
        products.map((product)=>{
          return(
            <Grid item xs={10} sm={4} margin='auto' key={product.id} >
            <ProductCard key={product.id} product={product} />
            </Grid>
          )
        })
      }
    </Grid>


  )
}

export default ProductList;