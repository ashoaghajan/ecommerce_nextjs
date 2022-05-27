import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext<any>(null);

export const useStateContext = () => useContext(Context);

interface StateContextProps {
    children: React.ReactNode;
}
 
const StateContext: React.FC<StateContextProps> = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<ProductItem[]>([]);
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState({ price: 0, qty: 0 });


    useEffect(() => {
        const { totalPrice, totalQty } = cartItems.reduce((acc, curr) => {
            acc.totalPrice += curr.price * curr.qty;
            acc.totalQty += curr.qty;
            return acc;
        }, { totalPrice: 0, totalQty: 0 });
        setTotal({ price: totalPrice, qty: totalQty });
    },[cartItems]);


    const incrementQty = () => setQty(prev => prev + 1);
    const decrementQty = () => setQty(prev => prev > 1 ? prev - 1 : 1);

    const handleAddProduct = (product: Product, qty: number) => {
        const productInCart = cartItems.find(item => item._id === product._id);
        if(productInCart){
            setCartItems(prev => (
                prev.map(item => {
                    if(item._id === product._id){
                        return { ...item, qty: item.qty + qty }
                    }
                    return item
                })
            ));
        }
        else{
            setCartItems(prev => ([...prev, { ...product, qty }]));
        }  
        setQty(1);
        toast.success(`${qty} ${product.name} added to the cart`);  
    }

    const changeCartItemQty = (id: string, type: 'inc'|'dec') => {
        setCartItems(prev => (
            prev.map(item => {
                if(item._id === id){
                    if(type === 'inc'){
                        return { ...item, qty: item.qty + 1 }
                    }
                    else if(item.qty > 1){
                        return { ...item, qty: item.qty - 1 }
                    }
                }
                return item
            })
        ))
    }

    const handleRemoveProduct = (id: string) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
        toast.error(`Product removed from the cart`);
    }


    return ( 
        <Context.Provider value={{
            showCart, setShowCart, setCartItems,
            cartItems, handleAddProduct,
            total, changeCartItemQty,
            qty, incrementQty, decrementQty,
            handleRemoveProduct, setTotal
        }}>
            {children}
        </Context.Provider>
    );
}
 
export default StateContext;

