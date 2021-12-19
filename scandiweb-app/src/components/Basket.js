import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import CategoryShow from './CategoryShow';
import {
    useComponentDidMount,
    useComponentDidUpdate,
    useComponentWillUnmount
  } from "./utils";
function Basket(){
    const [cartItems, setCartItems] = useState([]);
    
    useComponentDidMount(() => {
      const localsaveCart = localStorage.getItem('saveCart');
      if (localsaveCart) {
        setCartItems(JSON.parse(localsaveCart));
      }
    });
  
    useComponentDidUpdate(() => {
      // saveToLocal();
    });
  
    useComponentDidUpdate(() => {
      saveToLocal();
    }, [cartItems]);
  
    useComponentWillUnmount(() => {
      // console.log("Component will unmount!");
    });
   
    
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
      
    };
    const saveToLocal = () => {
      localStorage.clear();
      const local = cartItems;
      localStorage.setItem('saveCart', JSON.stringify(local));
    }
    return (
        <div>{cartItems.map((cartItem) => (
           
              <div className="plp-products">
                <div>

                {/* <img src={cartItem.gallery} alt="Image" /> */}
                  {/* <li>{cat.name}</li> */}
                  <h4>{cartItem.name}</h4>
                  <li>{cartItem.id} / {cartItem.name} /
                    {cartItem.prices.map((price) => (
                      <li>{price.amount} {price.currency}</li>
                    ))}
                  </li>
                  <li> 
                  {cartItem.qty}
                  </li>
              {/* <button onClick={()=>{onAdd(product);}}>Add to Cart</button> */}
              </div>
              </div>
          ))}</div>
    
    );
}
export default Basket;