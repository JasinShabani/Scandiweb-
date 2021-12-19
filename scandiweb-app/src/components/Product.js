import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Query } from "react-apollo";
import { useLocation } from "react-router-dom";

const PRODUCT_QUERY = gql`
query ProductQuery($id: String!){
  product(id: $id){
    __typename
    id
    brand
    name
    description
    category
    attributes{
      items{
        displayValue
      }
    }
  }
}

`;

function Product (props) {
  var query =window.location.pathname
  const productId = query.substring(9)
  // const {productId} = location.state;
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: productId},
  });
  
  console.log(productId);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        <div>
         
          <li>{data.product.__typename}</li>
          <li>{data.product.id}</li>
          <li>{data.product.brand}</li>
          <li>{data.product.name}</li>
          <li>{data.product.description}</li>
          <li>{data.product.category}</li>
          
        </div>
      </ul>
    </div>
  );
}
export default Product;