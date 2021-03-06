import { ThemeProvider,createTheme } from '@mui/material';
import { Container, CssBaseline } from '@mui/material';
import { Component, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Catalog from '../Features/catalog/Catalog'
import Homepage from '../Features/home/Homepage';
import About from '../Features/about/About';
import Contact from '../Features/contact/Contact';
import Productdetials from '../Features/productdetails/Productdetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from '../errors/NotFound';
import ServerError from  "../errors/ServerError";
import BasketPage from '../Features/basket/BasketPage';
import { useStoreContext } from '../context/StoreContext';
import LoadingComponent from './LoadingComponent';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import CheckoutPage from '../Features/Checkout/CheckoutPage';
import { setBasket } from '../Features/basket/basketSlice';
import { useAppDispatch } from '../store/configureStore';


const App = ()=> {

  // calling a custom hook
  // const {setBasket} = useStoreContext()

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    const buyerId = getCookie('buyerId')
    if(buyerId){
        agent.basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false))
    }
    else{
      setLoading(false)
    }
    
  },[dispatch])


  const [darkMode, setdarkMode] = useState(false);
  const modetype = darkMode? 'dark': 'light'

  const setMode = ()=>{
    setdarkMode(!darkMode)
    console.log("calleddd")
  }

  const darkTheme = createTheme({
    palette: {
      mode: modetype,
      background:{
        default: modetype==='light' ? '#eaeaea' : '#121212'
      }
    },
  });


  if(loading) return <LoadingComponent/>

  return(
  
    <ThemeProvider theme = {darkTheme}>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
    <CssBaseline/>
    <Header  setMode = {setMode}/>

    <Container>
        <Switch>
          <Route exact path= {'/'} component={Homepage} />
          <Route exact path= {'/catalog'} component={Catalog} />
          <Route exact path= {'/about'} component =  {About} />
          <Route exact path= {'/contact'} component = {Contact} />
          <Route path = {'/basket'} component ={BasketPage} />
          <Route exact path= {'/catalog/:id'} component = {Productdetials} />
          <Route  path= {'/not-found'} component = {NotFound} />
          <Route  path= {'/server-error'} component = {ServerError} />
          <Route  path= {'/checkout'} component = {CheckoutPage} />
          
          {/* <Redirect to={'/not-found'} /> */}

        </Switch>
    </Container>
    </ThemeProvider>
  
    
    
  )
}

export default App;