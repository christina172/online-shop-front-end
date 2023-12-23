import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// ============== MUI ==============
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// ============== Redux ==============
import { useAppDispatch } from "hooks";
import { useProductsSelector } from "./store/products.selectors";
import { getProduct } from "./store/products.actions";
import { useCartSelector } from 'app/cart/store/cart.selectors';
import { getUserCart, addCartItem, addProductQuantity } from 'app/cart/store/cart.actions';

// ============== Types ==============
import { AddCartItemDto } from 'app/cart/types/add-cart-item-dto.type';
import { UpdateCartItemDto } from 'app/cart/types/update-cart-item-dto.type';

// ============== Components ==============
import Loading from 'components/loading.components';
import ErrorMessage from 'components/error-message.component';

import noImageAvailable from 'assets/images/no-image-icon-23485.png';


const ProductPageView = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const {productId} = useParams<string>();

  const dispatch = useAppDispatch();
  const {product, pending, errors} = useProductsSelector();
  const {cart, cartId} = useCartSelector();

  useEffect(()=>{
    if (localStorage.getItem('os_access_token')) {
      dispatch(getUserCart());
    }
  }, [dispatch]);

  let image;
  if (product && product.image) {
    image=product.image;
  } else {
    image=noImageAvailable;
  }

  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 0) {
      setQuantity(Number(0));
    } else {
      if (product && Number(e.target.value)<= product.in_stock) {
        setQuantity(Number(e.target.value));
      }
    }
  }

  const handleAdd = (e: React.MouseEvent<HTMLElement>) =>{
    if (quantity>0) {
      if (localStorage.getItem('os_access_token')) {
      const cartItem = cart.find(item => item.product.id === product?.id);
      if (cartItem) {
        const dto: UpdateCartItemDto = {
          quantity: quantity
        }
        dispatch(addProductQuantity({dto: dto, orderItemId: cartItem.id}))
        .then(({ meta }) => {
          if (meta.requestStatus !== 'rejected') {
            alert("Product added to cart!")
          }
        })
      } else {
        const dto: AddCartItemDto = {
          quantity: quantity,
          productId: product!.id,
          orderId: cartId
        }
        dispatch(addCartItem({dto}))
          .then(({ meta }) => {
            if (meta.requestStatus !== 'rejected') {
              alert("Product added to cart!")
            }
        })
      }
    } else {
      navigate('/auth/log_in')
    }
  }
  }

  useEffect(()=>{
    if (productId) {
      dispatch(getProduct({productId}))
    }
  }, [dispatch])

  return (
    <>
      {pending.product 
        ?<Loading/>
        : !errors.product
          ?<>
          <Box sx={{
            display: 'flex', 
            flexDirection: small? 'column' : 'row', 
            gap: 2.5
          }} >
            <Box
              component="img"
              sx={{
                height: {xs: 270, md: 350, lg: 500},
                width: {xs: 270, md: 350, lg: 500},
                alignSelf: 'center'
              }}
              alt={product?.name}
              src={image}
            />
            <Stack>
              <Typography gutterBottom variant={small? 'h5' : 'h4'} component='h1'>{product?.name}</Typography>
              <Typography gutterBottom variant={small? 'subtitle2' : 'h6'} component='h2'>{product?.brand}</Typography>
              <Typography gutterBottom variant={small? 'body2' : 'body1'} component='h2'>Price: {product?.price} $</Typography>
              <Stack direction={small? 'row' : 'column'} spacing={2} sx={{my: 2}}>
                <TextField
                  id="quantity"
                  label="Quantity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size='small'
                  sx={{my: 2, alignSelf: 'flex-start'}}
                  value={quantity}
                  onChange={handleQuantityChange}
                  InputProps={{
                    inputProps: { 
                        max: product?.in_stock, min: 0 
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{alignSelf: small? 'center' : 'flex-start'}}
                  onClick={(e)=>handleAdd(e)}
                >
                  Add to cart
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Typography 
            gutterBottom 
            variant={small? 'body2' : 'body1'} 
            component='h2'
            sx={{mt: small? 0 : 2}}
          >
            {product?.description}
          </Typography>
        </>
        : <ErrorMessage title="Error" text={errors.product} />
      }
    </>
  )
};

export default ProductPageView;