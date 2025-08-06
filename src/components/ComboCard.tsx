import React from "react";
import { ComboOption } from "../types";

interface ComboCardProps {
  combo: ComboOption;
  selected: boolean;
  onSelect: (combo: ComboOption) => void;
}

const ComboCard: React.FC<ComboCardProps> = ({ combo, selected, onSelect }) => {
  const handleCardClick = () => {
    if (!selected) {
      onSelect(combo);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(combo);
  };

  return (
    <div
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        selected
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300"
      }`}
      onClick={handleCardClick}
    >
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {combo.quantity}
        </div>
        <div className="text-sm text-gray-600 mb-4">BILHETES DA SORTE</div>
        <div className="text-2xl font-bold text-blue-600 mb-2">
          R${combo.price.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500 mb-4">
          R${(combo.price / combo.quantity).toFixed(2)} /bilhete
        </div>
        {combo.popular && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            MAIS POPULAR
          </div>
        )}
        <button
          onClick={handleButtonClick}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            selected
              ? "bg-blue-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {selected ? "SELECIONADO" : "QUERO ESTE"}
        </button>
      </div>
    </div>
  );
};

export default ComboCard;
