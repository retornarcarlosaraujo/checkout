import { Shield, Sparkles, Star, Trophy } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-3 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Trophy className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                LuckyDraw
              </h1>
              <p className="text-sm text-slate-300 flex items-center space-x-1">
                <Sparkles className="h-3 w-3 text-yellow-400" />
                <span>Sua sorte está aqui</span>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-300">
                  Online
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-400/30 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-300">
                100% Seguro
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 py-2 rounded-full border border-blue-400/30 backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-blue-300">
                  24/7
                </span>
                <span className="text-xs text-blue-400">Suporte</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
