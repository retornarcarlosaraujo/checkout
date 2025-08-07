import React, { useState, useEffect } from "react";
import { Minus, Plus, Sparkles } from "lucide-react";
import { ComboOption } from "../types";

interface CustomComboCardProps {
  onSelect: (combo: ComboOption) => void;
}

const CustomComboCard: React.FC<CustomComboCardProps> = ({ onSelect }) => {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(1.0);
  const [totalPrice, setTotalPrice] = useState(1.0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Função para calcular o preço unitário baseado na quantidade
  const calculateUnitPrice = (qty: number): number => {
    if (qty >= 500) return 0.50;
    if (qty >= 350) return 0.54;
    if (qty >= 200) return 0.60;
    if (qty >= 100) return 0.70;
    if (qty >= 50) return 0.80;
    if (qty >= 10) return 0.99;
    return 1.0;
  };

  // Atualizar preços quando a quantidade mudar
  useEffect(() => {
    const newUnitPrice = calculateUnitPrice(quantity);
    const newTotalPrice = quantity * newUnitPrice;
    setUnitPrice(newUnitPrice);
    setTotalPrice(newTotalPrice);
  }, [quantity]);

  const handleIncrease = () => {
    if (quantity < 10000) {
      setQuantity(prev => prev + 1);
      triggerAnimation();
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      triggerAnimation();
    }
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1 && value <= 10000) {
      setQuantity(value);
      triggerAnimation();
    }
  };

  const handleSelect = () => {
    const customCombo: ComboOption = {
      id: 'custom',
      quantity,
      price: totalPrice,
      discount: quantity >= 10 ? Math.round(((1.0 - unitPrice) / 1.0) * 100) : 0
    };
    onSelect(customCombo);
  };

  const getDiscountPercentage = () => {
    if (quantity < 10) return 0;
    return Math.round(((1.0 - unitPrice) / 1.0) * 100);
  };

  return (
    <div className="relative p-8 rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:shadow-2xl transition-all duration-500 hover:border-blue-400 hover:scale-105 group overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
      
      {/* Custom Badge */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center space-x-1 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse">
          <Sparkles className="h-3 w-3 animate-spin" />
          <span>PERSONALIZE</span>
        </div>
      </div>

      <div className="text-center pt-4 relative z-10">
        {/* Quantity Controls */}
        <div className="mb-6">
          <div className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wider animate-pulse">
            Quantidade de Bilhetes
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-4">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-110 hover:rotate-12 active:scale-95 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <Minus className="h-5 w-5" />
            </button>
            
            <div className="relative transform transition-all duration-300 hover:scale-110">
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                max="10000"
                className={`w-28 h-14 text-center text-3xl font-black text-gray-800 border-2 border-blue-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-blue-50 ${isAnimating ? 'animate-pulse scale-110' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <button
              onClick={handleIncrease}
              disabled={quantity >= 10000}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-110 hover:-rotate-12 active:scale-95 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-xs text-gray-500 animate-bounce">
            Mín: 1 • Máx: 10.000 bilhetes
          </div>
        </div>

        {/* Price Display */}
        <div className="mb-6 relative">
          <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-2 transition-all duration-300 ${isAnimating ? 'animate-pulse scale-110' : ''}`}>
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-sm text-gray-600 mb-2 font-medium">
            R$ {unitPrice.toFixed(2).replace('.', ',')} por bilhete
          </div>
          
          {getDiscountPercentage() > 0 && (
            <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-bold px-4 py-2 rounded-full border border-green-200 shadow-lg animate-bounce">
              🎉 {getDiscountPercentage()}% de desconto
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="mb-6 text-xs text-gray-600 space-y-2">
          <div className="flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200">
            <span className="text-blue-500 animate-pulse">✨</span>
            <span>Quantidade personalizada</span>
          </div>
          <div className="flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200">
            <span className="text-blue-500 animate-pulse">💰</span>
            <span>Preço dinâmico</span>
          </div>
          <div className="flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200">
            <span className="text-blue-500 animate-pulse">🎯</span>
            <span>Controle total</span>
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={handleSelect}
          className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden group/main active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -skew-x-12 -translate-x-full group-hover/main:translate-x-full transition-transform duration-1000"></div>
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <Sparkles className="h-5 w-5 animate-spin" />
            <span>PERSONALIZAR COMBO</span>
            <Sparkles className="h-5 w-5 animate-spin" />
          </div>
        </button>
        
        {/* Floating particles effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomComboCard;
          PERSONALIZAR COMBO
        </button>
      </div>
    </div>
  );
};

export default CustomComboCard;