import React, { useState } from 'react';
import Header from './components/Header';
import SelectKit from './components/SelectKit';
import Checkout from './components/Checkout';
import OrderComplete from './components/OrderComplete';
import { ComboOption, Order } from './types';

type AppStep = 'select' | 'checkout' | 'complete';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('select');
  const [selectedCombo, setSelectedCombo] = useState<ComboOption | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleSelectCombo = (combo: ComboOption) => {
    setSelectedCombo(combo);
    setCurrentStep('checkout');
  };

  const handleBackToSelect = () => {
    setCurrentStep('select');
    setSelectedCombo(null);
  };

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    setCurrentStep('complete');
  };

  const handleReset = () => {
    setCurrentStep('select');
    setSelectedCombo(null);
    setCompletedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep !== 'complete' && <Header />}
      
      {currentStep === 'select' && (
        <SelectKit onSelectCombo={handleSelectCombo} />
      )}
      
      {currentStep === 'checkout' && selectedCombo && (
        <Checkout
          combo={selectedCombo}
          onBack={handleBackToSelect}
          onComplete={handleOrderComplete}
        />
      )}
      
      {currentStep === 'complete' && completedOrder && (
        <OrderComplete
          order={completedOrder}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;