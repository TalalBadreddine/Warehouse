import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LD1bYKFpTFwFr4qmqZ2faKLsbDmtbq9pOwoDuDvtAnR7PlI6BHQWVTgj4zrV6M4rafpgHegei3LwrPNinc4fZRD00BwOqNoTj');

function StripePayment(props) {
    const customerSecret = `${props.customerSecret}`
    

    const appearance = {
      theme: 'night',
      variables: {
        fontFamily: 'Sohne, system-ui, sans-serif',
        fontWeightNormal: '500',
        borderRadius: '8px',
        colorBackground: '#0A2540',
        colorPrimary: '#EFC078',
        colorPrimaryText: '#1A1B25',
        colorText: 'white',
        colorTextSecondary: 'white',
        colorTextPlaceholder: '#727F96',
        colorIconTab: 'white',
        colorLogo: 'dark'
      },
      rules: {
        '.Input, .Block': {
          backgroundColor: 'transparent',
          border: '1.5px solid var(--colorPrimary)'
        }
      }
    };


  const options = {
    // passing the client secret obtained in step 2
    clientSecret: customerSecret,
    // Fully customizable with appearance API.
    appearance:{
      theme: 'night',
      variables: {
        fontFamily: 'Sohne, system-ui, sans-serif',
        fontWeightNormal: '500',
        borderRadius: '8px',
        colorBackground: '#0A2540',
        colorPrimary: '#EFC078',
        colorPrimaryText: '#1A1B25',
        colorText: 'white',
        colorTextSecondary: 'white',
        colorTextPlaceholder: '#727F96',
        colorIconTab: 'white',
        colorLogo: 'dark'
      },
      rules: {
        '.Input, .Block': {
          backgroundColor: 'transparent',
          border: '1.5px solid var(--colorPrimary)'
        }
      }
    } ,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePayment