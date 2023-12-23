import {useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';

// ============== MUI ==============
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

// ============== Redux ==============
import { useAppDispatch } from "hooks";
import { useProductsSelector } from "./store/products.selectors";
import { getProducts, getProductsByCategory } from "./store/products.actions";
import { useCartSelector } from 'app/cart/store/cart.selectors';
import { getUserCart } from 'app/cart/store/cart.actions';

import {axiosAuth} from "repository";

// ============== Components ==============
import ProductCard from 'app/products/components/product-card.component';
import Loading from 'components/loading.components';
import ErrorMessage from 'components/error-message.component';


const ProductsPageView = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();

  const dispatch = useAppDispatch();
  const {products, pending, errors} = useProductsSelector();
  const {cart, cartId} = useCartSelector();

  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string | null>();
  const [pageCount, setPageCount] = useState<number>();
  const [heading, setHeading] = useState('Products');

  useEffect(()=>{
    if (localStorage.getItem("os_access_token")) {
      dispatch(getUserCart());
    }
  }, [dispatch])

  useEffect(() => {
    const searchParams: any = new URLSearchParams(window.location.search);
    if (!searchParams.size) {
      setPage(1);
      setCategory(null);
      dispatch(getProducts({page: 1}));
      axiosAuth.get('products/pages')
        .then((response)=>setPageCount(response.data));
    } else {
      const category = searchParams.get('category');
      const page = searchParams.get('page');
      setCategory(category);
      setPage(+page!);
      const countPages = async ()=>{
        try {
          if (category) {
            const response = await axiosAuth.get(`products/pages/${category}`);
            setPageCount(response.data);
          } else {
            const response = await axiosAuth.get('products/pages');
            setPageCount(response.data);
          }        
        } catch(e) {
          console.log(e);
        }
      }
      countPages();
      if (category) {
        dispatch(getProductsByCategory({categoryName: category, page: +page!}));
      } else {
        dispatch(getProducts({page: +page!}));
      }
    }
  }, [dispatch, location])

  useEffect(()=>{
    if(category) {
      setHeading(category);
    } else {
      setHeading('Products')
    }
  }, [category]);

  return (
    <>
      <Typography variant='h4' component='h1' sx={{mb: 2.5}}>
        {heading}
      </Typography>
      <Grid container spacing={3}>
      {pending.products 
        ?<Loading/>
        :(products && products.length !== 0)
          ? (products.map(product=>(
          <Grid 
            item 
            key={product.name} 
            xs={12} sm={6} md={4} lg={3} 
            sx={{display: 'flex'}}
          >
            <ProductCard product={product} cart={cart} cartId={cartId}/>

          </Grid>
          )))
          : !errors.products && <Typography sx={{p: 2.5}}>Sorry, there are no products available at the moment...</Typography>
        }
      </Grid>
      { errors.products && <ErrorMessage title="Error" text={errors.products} /> }
      <Stack sx={{alignItems:'center'}}>
        <Pagination 
          page={page}
          count={pageCount} 
          sx={{mt: 2.5}} 
          size={small? 'small' : 'medium'}
          renderItem={(item) => 
            {
              if (category) {
                return (<PaginationItem {...item} component={Link} to={`/products?category=${category}&page=${item.page}`} />)
              }
              return (<PaginationItem {...item} component={Link} to={`/products?page=${item.page}`} />)
            }
          }
        />
      </Stack>
    </>
  )
}

export default ProductsPageView;