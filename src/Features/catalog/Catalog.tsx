import ProductList from "./ProductList";
import { Products } from "../../models/Products"
import { useState } from "react";
//import{ data} from '../../api/apidata'
import { useEffect } from "react";
import axios from "axios";
import agent from "../../api/agent";
import LoadingComponent from "../../Layouts/LoadingComponent";

const Catalog = ()=>{



        // const [products,setProducts] = useState<Products[]>([
        //   {id:1,name:"product1", price:100,pictureUrl:"http://picsum.photos/200", brand:"brand1"}
        // ]);

        const [products,setProducts] = useState<Products[]>([])

    // const addProduct = ()=>{
        // setProducts(prevprod =>([...prevprod, 
        //   {
        //     id:(prevprod.length+1),
        //     name:"product"+(prevprod.length+1),
        //     price: (prevprod.length)*100 + 100,
        //     pictureUrl:"http://picsum.photos/200",
        //     brand:"brand" + (prevprod.length+1)
          
        //   }]))

        // }

    const [loading, setloading] = useState(true)

    useEffect(()=>{

            // fetch("https://localhost:44323/api/products")
            // .then(res => res.json())
            // .then(data=> setProducts(data))
            // axios.get("https://localhost:44323/api/products")
            // .then(res => res.data)
            agent.catalog.list()
            .then(data=> setProducts(data))
            .catch(error=>console.log(error))
            .finally(()=> setloading(false))

    },[])

    if(loading) return <LoadingComponent/>

    return(
        <>
            <ProductList products={products} />
            {/* <button onClick={addProduct} className="getcss" > Add products</button> */}
            {/* <Button onClick = {addProduct} style={media} >ADD Products</Button> */}
        </>
        

    )
}
export default Catalog