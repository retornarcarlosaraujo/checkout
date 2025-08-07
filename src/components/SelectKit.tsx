import { Clock, Users } from "lucide-react";
import { combos } from "../data/combos";
import { ComboOption } from "../types";
import ComboCard from "./ComboCard";

interface SelectKitProps {
  onSelectCombo: (combo: ComboOption) => void;
}

export default function SelectKit({ onSelectCombo }: SelectKitProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./Screenshot_4.png')",
          }}
        ></div>

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>

        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-red-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 rounded-full mb-8 shadow-xl animate-pulse">
            <Clock className="h-5 w-5" />
            <span className="font-black text-sm tracking-wide text-white">
              ÚLTIMOS DIAS PARA CONCORRER
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-white drop-shadow-2xl">
              A CHANCE DA SUA VIDA
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 drop-shadow-lg">
              CONCORRA A UMA HILUX 2025!
            </span>
          </h1>

          <p className="text-2xl text-white/90 mb-12 font-medium drop-shadow-lg">
            Escolha seu combo e aumente suas chances de ganhar
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Users className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold text-white">
                +10.000 participantes
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <span className="text-2xl">🏆</span>
              <span className="font-semibold text-white">
                Prêmios incríveis
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Combo Selection */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-6">
            Escolha um combo
          </h2>
          <p className="text-gray-600 text-xl font-medium">
            Quanto mais números, maiores suas chances de ganhar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {combos.map((combo) => (
            <ComboCard
              key={combo.id}
              combo={combo}
              selected={false}
              onSelect={onSelectCombo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
