import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineMinus, AiOutlinePlus, AiOutlineLeft } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { makePayment } from '../lib/getStripe';

interface CartProps {
    
}
 
const Cart: React.FC<CartProps> = () => {

    const cartRef = useRef(null);
    const { total, cartItems, setShowCart, changeCartItemQty, handleRemoveProduct }: StateContext = useStateContext();

    const handleChechout = () => makePayment(cartItems);

    return ( 
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>({total.qty} items)</span>
                </button>
                {cartItems.length ? (
                    <div className='product-container'>
                        {cartItems.map(item => (
                            <div className='product' key={item._id}>
                                <img src={String(urlFor(item?.image[0]))}
                                  className='cart-product-image' alt={item.name}/>
                                <div className="item-desc">
                                    <div className="flex top">
                                        <h5>{item.name}</h5>
                                        <h4>${item.price}</h4>
                                    </div>
                                    <div className="flex bottom">
                                        <div>
                                            <p className="quantity-desc">
                                                <span className="minus" onClick={() => changeCartItemQty(item._id, 'dec')}>
                                                    <AiOutlineMinus/>
                                                </span>
                                                <span className="num">{item.qty}</span>
                                                <span className="plus" onClick={() => changeCartItemQty(item._id, 'inc')}>
                                                    <AiOutlinePlus/>
                                                </span>
                                            </p>
                                        </div>
                                        <button type='button' className='remove-item'
                                            onClick={() => handleRemoveProduct(item._id)}>
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>  
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150}/>
                        <h3>Your shopping bag is empty</h3>
                        <Link href='/'>
                            <button type='button'  className='btn' onClick={() => setShowCart(false)}>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
                {cartItems.length && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${total.price}</h3>
                        </div>
                        <div className="btn-container">
                            <button type='button' className='btn' onClick={handleChechout}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Cart;