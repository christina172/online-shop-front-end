import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

// ============== MUI ==============
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// ============== Redux ==============
import { useAppDispatch } from "hooks";
import { useCartSelector } from 'app/cart/store/cart.selectors';
import { getUserCart, deleteCartItem, addProductQuantity, placeOrder } from 'app/cart/store/cart.actions';

// ============== Components ==============
import Loading from 'components/loading.components';
import ErrorMessage from 'components/error-message.component';


const CartPageView = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {cart, cartId, pending, errors} = useCartSelector();

  const [total, setTotal] = useState(0);

  useEffect(()=>{
    dispatch(getUserCart());
  }, [dispatch])

  useEffect(() => {
    const totalSum = cart.reduce(
        (accumulator, item) => accumulator + item.quantity * item.product.price,
        0,
    );
    setTotal(Math.round(totalSum * 100) / 100);
  }, [cart]);

  const changeItemQuantity = (id: string, previousQuantity: number, in_stock:number, action: string) => {
    if (action==="remove") {
      if (previousQuantity===1) {
        dispatch(deleteCartItem(id))
      } else {
        dispatch(addProductQuantity({dto: {quantity: -1}, orderItemId: id}))
      }
    };
    if (action==="add") {
      if (previousQuantity<in_stock) {
        dispatch(addProductQuantity({dto: {quantity: 1}, orderItemId: id}))
      }
    }
  }

  const handleDelete = (id: string,) => {
    dispatch(deleteCartItem(id));
  }

  const handleOrderPlacing = (id: string) => {
    dispatch(placeOrder(id))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          navigate('/user/order_history', { replace: true });
        }
      })
  }

  return (
    <>
      <Typography gutterBottom variant='h4' component='h1'>Cart</Typography>
      {pending.cart 
        ?<Loading/>
        :cart.length !== 0
          ?(<Stack sx={{width: small? '100%' : '80%', mx: 'auto'}} spacing={2}>
            {cart.map(item=>(
              <Paper 
                key={item.id}
                elevation={2}
                sx={{
                  display: 'flex', 
                  flexDirection: small? 'column' : 'row', 
                  justifyContent: 'space-between', 
                  gap: small? 0 : 2,
                  p: 2
                }}
              >
                <Box>
                  <Typography variant={small? 'body2' : 'body1'} component='h2'>
                    {item.product.name}, {item.product.brand}
                  </Typography>
                  <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                    <IconButton onClick={()=>changeItemQuantity(item.id, item.quantity, item.product.in_stock, "remove")}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={()=>changeItemQuantity(item.id, item.quantity, item.product.in_stock, "add")}>
                        <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography>In stock: {item.product.in_stock}</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:small?'row':'column', justifyContent:'space-between', alignItems:'center'}}>
                  <Typography 
                    variant='h6' 
                    component='p'
                    sx={{alignSelf: 'center', whiteSpace: 'nowrap'}}
                  >
                    {(item.quantity*item.product.price).toFixed(2)} $
                  </Typography>
                  <IconButton onClick={()=>handleDelete(item.id)}>
                    <DeleteIcon/>
                  </IconButton>
                </Box>
              </Paper>
            ))}
            <Typography variant='h5' component='p' sx={{alignSelf: 'flex-end'}}>Total: {total} $</Typography>
            { errors.cart && <ErrorMessage title="Failed to place the order" text={errors.cart} /> }
            <Button 
              variant="contained" 
              sx={{alignSelf: 'center'}} 
              onClick={()=>handleOrderPlacing(cartId)}
            >
              Place an order
            </Button>
          </Stack>)
          : !errors.cart && <Typography sx={{py: 1}}>Your cart is empty</Typography>}
    </>
  )
};

export default CartPageView;