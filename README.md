# online-shop-front-end
Internship 2023 - Online shop front end (React, Redux Toolkit, Material UI)

This is the front end for the full-stack project Online Shop.

Link to the back end repository: https://github.com/christina172/online-shop-back-end.

## Running the app

Refer to the back end repository.

## Project structure

The project follows the ddd (domain driven design) structure. The main index.tsx and App.tsx files along with the store and repository (containing two axios instances with refresh token logic) are in the src directory. It also contains the App.routes.tsx file, in which main routes are defined. There also are types (with common types), components (with common components), assets/images (with no-image-found fallback image) and app folders in the src directory. The app folder contains the folders, which represent the domains. At the route of each such folder there is an index file, which imports the routes for the particular domain. The file with the routes defines the pages for each route, which are also at the root of each of the domain folders (except for the user domain  - the user folder has the index and routes files, and the cart and the orders folders have the pages). The redux slice, actions and selectors are in the store foldre of each domain directory. Domain folders also include folders with components, types and enums used by the particular domain.

## Description

The app has 6 pages: 
1. the home page, which displays the products with pagination,
2. the product page with the details about the product,
3. the cart page with the user's cart,
4. the order history cart,
5. login page,
6. sign-up page.

All routes are public except for the 'user/cart' and 'user/order_history' routes. There are two axios instances: one for the endpoints, which require the Authorization header, and another for all other endpoints, including refreshing the tokens. Tokens are stored in local storage.

The layout component wraps the app routes. It has a drawer menu to choose between the categories of products and links to log in and sign up, and a navbar with a menu (displayed only to authenticated users) with a link to log out and links to cart and order history pages.

Products may be added to cart on the home and the product pages. And their quantity may be changed on the cart page. The product may also be deleted from cart on this page.
