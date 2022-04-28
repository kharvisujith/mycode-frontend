
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, ListItem, List,Toolbar, Typography,IconButton,Badge } from "@mui/material"
import { Switch } from "@mui/material"
import { Box } from "@mui/system"
import { Link, NavLink } from "react-router-dom"




export interface Props{
    setMode: () => void
}

const midlinks = [
    {title:'catalog',path:'/catalog'},
    {title:'about', path:'/about'},
    {title:'contact', path:'/contact'}
]

const rightlinks = [
    {title:'Login', path:'/about'},
    {title:'register',path:'/contact'}
]

const Header = ({setMode}:Props)=>{
    return(
        <>
            <AppBar position='static' sx={{mb:5}}>
                <Toolbar sx={{display:'flex', justifyContent:'space-around', alignItems:'center'}} >
                    <Box display='flex' alignItems='center'>
                        <Typography variant="h4"> 
                            My-sToRe
                        </Typography>
                        <Switch
                            onChange={setMode}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />

                    </Box>

                    <List sx={{display:'flex'}}>
                        {
                        midlinks.map(({title,path})=>{
                            return(
                                <ListItem 
                                    component={NavLink}
                                    to={path} 
                                    key={path}
                                    sx={{
                                        color:'inherit',
                                        typography:'h6',
                                        '&:hover' : {
                                            color:'grey.500'
                                        },
                                        '&.active':{
                                            color:'text.secondary'
                                        }
                                    
                                    }} 
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            )
                            })
                        }
                    </List>
                    

                    {/* <IconButton aria-label="cart" sx={{color:'inherit'}}>
                       <Badge badgeContent={0} color="secondary">
                                <ShoppingCartIcon />
                        </Badge> 
                    </IconButton> */}

                    <Box display='flex'>
                    <IconButton component={Link} to={'/basket'} color='inherit'>
                    <Badge badgeContent={4} color='secondary' >
                    <ShoppingCartIcon/>
                    </Badge>
                    </IconButton>

            
                    <List sx={{display:'flex'}}>
                        {
                            rightlinks.map(({title,path})=>{
                                return(
                                <ListItem 

                                component = {NavLink}
                                to={path}
                                key={path}
                                sx={{color:'inherit',
                                 typography:'h6',
                                 '&:hover' : {
                                    color:'grey.500'
                                },
                                '&.active':{
                                    color:'text.secondary'
                                }
                                }}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                                )

                            })
                        }
                    
                    </List>
                    </Box>

                       
                    

                    
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Header