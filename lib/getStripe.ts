import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';

let stripePromise: any = null;

const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
    }
    return stripePromise;
}


export const makePayment = async(cartItems: ProductItem[]) => {
    try{
        const stripe = await getStripe();
        const { data } = await axios.post('/api/stripe', { cartItems });
        if(data){
            toast.loading('redirecting to checkout');
            stripe.redirectToCheckout({ sessionId: data.id });
        }
    }
    catch(err: any){
        console.log(err.message)
    }
}