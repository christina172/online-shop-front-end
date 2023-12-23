# online-shop-front-end
Internship 2023 - Online shop front end (React, Redux Toolkit, Material UI)

This is the front end for the full-stack project Online Shop.

Link to the repository for the back end: https://github.com/christina172/online-shop-back-end.

## Running the app

Refer to the repository for the back end.

## Project structure

Add project structure desciption

## Description

Add description

## Issues

One of the issues is that after refresh token expires, when on a products or a product page, the user will be redirected to the login screen (e.g. in case of a page refresh), because the access token is still present in the local storage, but dispatching the action to get the user's cart will cause an unauthorized error, because the refresh token is not valid. To fix this, rework the code to not dispatch "getUserCart" action on these pages, check if an order item with a particular product id already exists in the cart on the back end.

## Rework

- Check not to return sensitive information in errors
- Handle pending states and errors

