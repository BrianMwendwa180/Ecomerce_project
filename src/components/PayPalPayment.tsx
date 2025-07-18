import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({ amount, onSuccess, onError }) => {
  const initialOptions = {
    clientId: "test", // Replace with your PayPal client ID
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">PayPal Payment</h3>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order!.capture();
              onSuccess(details.id || 'paypal-transaction');
            } catch (error) {
              onError('PayPal payment failed');
            }
          }}
          onError={(err) => {
            console.error('PayPal error:', err);
            onError('PayPal payment error occurred');
          }}
        />
      </PayPalScriptProvider>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Demo Mode:</strong> This is using PayPal's sandbox environment. 
          In production, replace the client ID with your live PayPal client ID.
        </p>
      </div>
    </div>
  );
};

export default PayPalPayment;