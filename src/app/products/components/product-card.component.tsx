import React from 'react';
import { useNavigate } from 'react-router-dom';

// ============== MUI ==============
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import noImageAvailable from 'assets/images/no-image-icon-23485.png';

// ============== Redux ==============
import { useAppDispatch } from "hooks";
import { addCartItem, addProductQuantity } from 'app/cart/store/cart.actions';

// ============== Types ==============
import { ProductDto } from 'app/products/types/product-dto.type';
import { CartItemDto } from 'app/cart/types/cart-item-dto';
import { AddCartItemDto } from 'app/cart/types/add-cart-item-dto.type';
import { UpdateCartItemDto } from 'app/cart/types/update-cart-item-dto.type';


const ProductCard = (props: {product: ProductDto, cart: CartItemDto[], cartId: string} ) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let image;
  if (props.product.image) {
    image=props.product.image;
  } else {
    image=noImageAvailable;
  }

  const handleAdd = async (e: React.MouseEvent<HTMLElement>) =>{
    if (localStorage.getItem('os_access_token')) {
      const cartItem = props.cart.find(item => item.product.id === props.product.id);

      if (cartItem) {
        const dto: UpdateCartItemDto = {
          quantity: 1
        }
        dispatch(addProductQuantity({dto: dto, orderItemId: cartItem.id}))
        .then(({ meta }) => {
          if (meta.requestStatus !== 'rejected') {
            alert("Product added to cart!")
          }
        })
      } else {
        const dto: AddCartItemDto = {
          quantity: 1,
          productId: props.product.id,
          orderId: props.cartId
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

  return (
    <Card elevation={4}
      sx={{
        display: 'flex', 
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        flexGrow: 1,
        "&:hover": {
          cursor: 'pointer'
        }
      }}
      onClick={()=>navigate(`/products/${props.product.id}`)}
    >
      <CardMedia
        component="img"
        sx={{ height: 270, width: 270, alignSelf: "center", py: 1, px: 2 }}
        image={image}
        title={props.product.name}
      />
      <CardContent sx={{py: 1, px: 2}}>
        <Typography gutterBottom variant="body1" component="h2">
        {props.product.name}
        </Typography>
        <Typography variant="subtitle2" component="h3">
          {props.product.brand}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: "center"}}>
        <Button size="small" onClick={(e)=>{e.stopPropagation(); handleAdd(e)}}>Add to cart</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard