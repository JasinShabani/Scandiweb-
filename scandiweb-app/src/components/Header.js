import React, { Suspense } from 'react'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import CategoryShow from './CategoryShow';
import logoBasket from '../images/basket.png'; 
import logoDollar from '../images/dollar.png'; 

function Header(){
    return (
        
        <nav>
            <ul className='nav-links'>
                <CategoryShow />
                <Link to={{pathname:'/'}}>
                    <h3>Logo</h3>
                </Link>
                <Link to={{pathname:'/basket'}}>
                    
                    <li className='nav-link-right bask'>
                        <img src={logoBasket} alt="Basket" />
                        </li>
                </Link>
                <li className='nav-link-right bask'>
                        <img src={logoDollar} alt="Basket" />
                        </li>
            </ul>
            
        </nav>
    
    );
}
export default Header;