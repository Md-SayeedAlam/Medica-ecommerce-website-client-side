import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import ChekoutForm from './ChekoutForm';
import { Helmet } from 'react-helmet-async';

const stripePromise= loadStripe(import.meta.env.VITE_Payment_gateway_PK)
const Payment = () => {
    return (
        <div>
              <Helmet>
                    <title>Payment || Medica</title>
                  </Helmet>
            <h2 className='my-5 text-xl text-center'>Payment By Card</h2>
           <div className='mx-5'>
           <Elements stripe={stripePromise}>
                <ChekoutForm></ChekoutForm>
            </Elements>
           </div>
        </div>
    );
};

export default Payment;