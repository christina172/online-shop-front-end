import { useEffect } from 'react';

// ============== MUI ==============
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ============== Redux ==============
import { useAppDispatch } from "hooks";
import { getUserOrders } from 'app/orders/store/orders.actions';
import { useOrdersSelector } from 'app/orders/store/orders.selectors';

// ============== Components ==============
import Loading from 'components/loading.components';

import { parse, format } from 'date-fns';


const OrderHistoryPageView = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const {orders, pending, errors} = useOrdersSelector();

  useEffect(()=>{
    dispatch(getUserOrders());
  }, [dispatch])

  return (
    <>
      <Typography gutterBottom variant='h4' component='h1'>Order History</Typography>
      {pending.orders 
        ?<Loading/>
        :(orders && orders.length !== 0)
          ?<Stack sx={{width: small? '100%' : '80%', mx: 'auto'}} spacing={2}>
            {orders.map(order=>(
              <Accordion key={order.id} elevation={3}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{justifyContent: 'space-between'}}
                >
                  <Typography variant={small? 'body1' : 'h5'} component='h2'>
                    Order, {format(parse(order.updatedAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()), 'PPPp')}
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  {order.order_items.map(item=>(
                    <Box 
                      key={item.id} 
                      sx={{
                        display: 'flex', 
                        flexDirection: small? 'column' : 'row', 
                        justifyContent: 'space-between',
                        mb: 1.5,
                        gap: small? 0 : 2
                      }}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant={small? 'body2' : 'body1'} component='h3'>
                          {item.product.name}, {item.product.brand}
                        </Typography>
                        <Typography variant={small? 'body2' : 'body1'} component='h3' sx={{fontWeight: 'bold'}}>
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography 
                        variant='body1' 
                        component='p'
                        sx={{alignSelf: small? 'flex-start' : 'center', whiteSpace: 'nowrap', fontWeight: 'bold'}}
                      >
                        {(item.quantity*item.price).toFixed(2)} $
                      </Typography>
                    </Box>
                  ))}
                  <Divider />
                  <Typography variant='h6' component='h4' sx={{textAlign: 'end'}}>
                    Total: {order.order_total} $
                  </Typography>
                </AccordionDetails>
              </Accordion>
              ))}
          </Stack>
          : !errors.orders && <Typography sx={{p: 2.5}}>You haven't placed any orders yet</Typography>
      }
    </>
  )
};

export default OrderHistoryPageView;