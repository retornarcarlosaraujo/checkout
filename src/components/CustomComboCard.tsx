import React, { useState, useEffect } from "react";
import { Minus, Plus, Settings } from "lucide-react";
import { ComboOption } from "../types";

interface CustomComboCardProps {
  onSelect: (combo: ComboOption) => void;
}

const CustomComboCard: React.FC<CustomComboCardProps> = ({ onSelect }) => {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(1.0);
  const [totalPrice, setTotalPrice] = useState(1.0);

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
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1 && value <= 10000) {
      setQuantity(value);
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
    <div className="relative p-8 rounded-2xl border-3 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 hover:shadow-2xl transition-all duration-300 hover:border-purple-400">
      {/* Custom Badge */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center space-x-1 shadow-lg">
          <Settings className="h-3 w-3" />
          <span>PERSONALIZE</span>
        </div>
      </div>

      <div className="text-center pt-4">
        {/* Quantity Controls */}
        <div className="mb-6">
          <div className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wider">
            Quantidade de Bilhetes
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Minus className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                max="10000"
                className="w-24 h-12 text-center text-2xl font-black text-gray-800 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
              />
            </div>
            
            <button
              onClick={handleIncrease}
              disabled={quantity >= 10000}
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            Mín: 1 • Máx: 10.000 bilhetes
          </div>
        </div>

        {/* Price Display */}
        <div className="mb-6">
          <div className="text-3xl font-black text-purple-600 mb-2">
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            R$ {unitPrice.toFixed(2).replace('.', ',')} por bilhete
          </div>
          
          {getDiscountPercentage() > 0 && (
            <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
              🎉 {getDiscountPercentage()}% de desconto
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="mb-6 text-xs text-gray-600 space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-purple-500">✨</span>
            <span>Quantidade personalizada</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-purple-500">💰</span>
            <span>Preço dinâmico</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-purple-500">🎯</span>
            <span>Controle total</span>
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={handleSelect}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          PERSONALIZAR COMBO
        </button>
      </div>
    </div>
  );
};

export default CustomComboCard;