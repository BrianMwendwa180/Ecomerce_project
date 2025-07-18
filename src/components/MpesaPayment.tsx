import React, { useState } from 'react';
import { Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

interface MpesaPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const MpesaPayment: React.FC<MpesaPaymentProps> = ({ amount, onSuccess, onError }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      onError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setStep('processing');

    try {
      // Simulate M-Pesa STK Push
      // In production, this would call your backend API which interfaces with Safaricom's Daraja API
      const response = await simulateMpesaPayment(phoneNumber, amount);
      
      if (response.success) {
        setStep('success');
        setTimeout(() => {
          onSuccess(response.transactionId || 'mpesa-demo-transaction');
        }, 2000);
      } else {
        onError(response.message || 'M-Pesa payment failed');
        setStep('input');
      }
    } catch (error) {
      onError('M-Pesa payment error occurred');
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  const simulateMpesaPayment = async (phone: string, amount: number) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate successful payment (90% success rate for demo)
    const success = Math.random() > 0.1;
    
    return {
      success,
      transactionId: success ? `MPESA${Date.now()}` : undefined,
      message: success ? 'Payment successful' : 'Payment was cancelled or failed'
    };
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as Kenyan phone number
    if (digits.startsWith('254')) {
      return digits;
    } else if (digits.startsWith('0')) {
      return '254' + digits.slice(1);
    } else if (digits.startsWith('7') || digits.startsWith('1')) {
      return '254' + digits;
    }
    
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  if (step === 'processing') {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">M-Pesa Payment</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-900 mb-2">Processing Payment</p>
          <p className="text-gray-600 mb-4">
            Please check your phone for the M-Pesa prompt and enter your PIN
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <Smartphone className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                STK Push sent to {phoneNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">M-Pesa Payment</h3>
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</p>
          <p className="text-gray-600">Your order is being processed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">M-Pesa Payment</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            M-Pesa Phone Number
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="254700000000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Enter your M-Pesa registered phone number
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Amount to pay:</span>
            <span className="text-xl font-bold text-green-600">
              KES {(amount * 110).toFixed(2)} {/* Assuming 1 USD = 110 KES */}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Equivalent to ${amount.toFixed(2)} USD
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !phoneNumber}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Smartphone className="h-5 w-5" />
          <span>{loading ? 'Processing...' : 'Pay with M-Pesa'}</span>
        </button>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">How M-Pesa payment works:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Enter your M-Pesa registered phone number</li>
                <li>Click "Pay with M-Pesa" to initiate payment</li>
                <li>You'll receive an STK push on your phone</li>
                <li>Enter your M-Pesa PIN to complete the payment</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> This is a simulation of M-Pesa payment. 
            In production, this would integrate with Safaricom's Daraja API for real transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MpesaPayment;