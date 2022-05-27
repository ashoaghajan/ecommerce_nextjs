import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs'
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

interface SuccessProps {
    
}
 
const Success: FC<SuccessProps> = () => {

    const { setCartItems, setTotal }: StateContext = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotal({ price: 0, qty: 0 });
        runFireworks();
    },[])

    return ( 
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order</h2>
                <p className='email-msg'>Check your email inbox for receipt.</p>
                <p className="description">
                    If you have any questions please email
                    <a href="mailto:order@example.com" className="email">
                        mailto:order@example.com
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' style={{ width: 300 }} className='btn'>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}
 
export default Success;
