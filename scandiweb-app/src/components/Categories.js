import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import logo from '../images/basket.png'; 

import {
  useComponentDidMount,
  useComponentDidUpdate,
  useComponentWillUnmount
} from "./utils";

const PRODUCT_QUERY = gql`
{
  categories{
    name
     products{
        id
        name
        category
        inStock
        description
        brand
        gallery
        attributes{
          id
          items{
            displayValue
          }
          type
        }
        prices{
          amount
          currency
        }
  	}
  }
}
`;

const Categories= ({ozellik}) => {
  const { data, loading, error } = useQuery(PRODUCT_QUERY);
  const [cartItems, setCartItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [productIdIsHovered, setProductIdIsHovered] = useState('');
  console.log(productIdIsHovered);
  useComponentDidMount(() => {
    const localsaveCart = localStorage.getItem('saveCart');
    if (localsaveCart) {
      setCartItems(JSON.parse(localsaveCart));
    }
  });

  useComponentDidUpdate(() => {
    // saveToLocal();
    console.log('DidUpdate')
  });

  useComponentDidUpdate(() => {
    saveToLocal();
  }, [cartItems]);

  useComponentWillUnmount(() => {
    // console.log("Component will unmount!");
    console.log('unmount')
  });

  const handleHover = (props)=>{
    isHovered= props;
    console.log(isHovered)
  };
  
  const onAdd = (product)=>{
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist){
      setCartItems(
        cartItems.map((x) =>
        x.id === product.id ? {...exist, qty:exist.qty+1}:x
        
      )
      );
    }else{
        setCartItems([...cartItems, {...product, qty:1}]);
    }
      alert('Product has been added to Your Cart!')
  };
  const saveToLocal = () => {
    localStorage.clear();
    const local = cartItems;
    localStorage.setItem('saveCart', JSON.stringify(local));
  }

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  
  console.log(ozellik);
  console.log(isHovered)
  // console.log(data.categories.products.map((product) => product));
  return (
    <div className="plp">
      <h1 className="plp-header">{ozellik}</h1>
      <ul className="plp-ul">
      <li>{data.categories.map((cat) => (
        <li>{cat.products.map((product) => (
          <div className="plp-pre-products">
          {ozellik==='all'&&
            <div className="plp-products"                     
            onMouseEnter={() => {setIsHovered(true)}}
            onMouseLeave={() => {setIsHovered(false)}}>
                 <div className="plp-products-inside"
                  onMouseEnter={() => {setProductIdIsHovered(product.id)}}
                  onMouseLeave={() => {setProductIdIsHovered(product.id)}}>
                <Link to={{pathname:'/product/'+product.id}}>
                <img src={product.gallery} alt="Image" />
                </Link>
                <button className="naber" onClick={()=>{onAdd(product);}}>
                        {isHovered===true  && productIdIsHovered===product.id &&
                        <img src={logo} alt="Basket" /> }
                        </button>
                <Link to={{pathname:'/product/'+product.id}}>
                  <h4 className="plp-product-name">{product.name}</h4>
                  <li>{product.id} / {product.name} /
                    {product.prices.map((price) => (
                      <li>{price.amount} {price.currency}</li>
                    ))}
                  </li>
                </Link>
                {/* <Basket cartItems={cartItems}></Basket> */}
              </div>
            </div>
          }
          {ozellik === product.category &&
             <div className="plp-products"                     
             onMouseEnter={() => {setIsHovered(true)}}
             onMouseLeave={() => {setIsHovered(false)}}>
                  <div className="plp-products-inside"
                   onMouseEnter={() => {setProductIdIsHovered(product.id)}}
                   onMouseLeave={() => {setProductIdIsHovered(product.id)}}>
                  <Link to={{pathname:'/product/'+product.id}} >
                      <img src={product.gallery} alt="Image" 
                      /> 
                  </Link>
                      <button className="naber" onClick={()=>{onAdd(product);}}>
                        {isHovered===true  && productIdIsHovered===product.id &&
                        <img src={logo} alt="Basket" /> }
                        </button>

                    <Link to={{pathname:'/product/'+product.id}}>
                          <h4 className="plp-product-name">{product.name}</h4>
                          <li>{product.id} / {product.name} /
                            {product.prices.map((price) => (
                              <li>{price.amount} {price.currency}</li>
                            ))}
                          </li>
                    </Link>
                  </div>
              </div>
          }
          </div>
          ))}</li>
      ))}</li>
      </ul>
    </div>
    
  );
}

export default Categories;