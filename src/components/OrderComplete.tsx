import React from 'react';
import { CheckCircle, Download, Calendar, MapPin, User, Hash, ArrowLeft } from 'lucide-react';
import { Order } from '../types';

interface OrderCompleteProps {
  order: Order;
  onReset: () => void;
}

export default function OrderComplete({ order, onReset }: OrderCompleteProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-8 shadow-2xl animate-bounce">
            <CheckCircle className="h-14 w-14 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-5xl font-black text-gray-800 mb-6">
            Pedido Confirmado!
          </h1>
          <p className="text-2xl text-gray-600 mb-4 font-medium">
            Parabéns! Sua participação foi registrada com sucesso.
          </p>
          <p className="text-xl text-gray-500">
            Número do pedido: <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">#{order.id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-10 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <span>Detalhes do Pedido</span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-8 rounded-2xl text-center border-2 border-blue-300">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                  {order.combo.quantity}
                </div>
                <div className="text-gray-700 mb-4 font-semibold uppercase tracking-wider">números da sorte</div>
                <div className="text-4xl font-black text-green-600 mb-2">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                </div>
                {order.combo.discount! > 0 && (
                  <div className="mt-2">
                    <span className="bg-gradient-to-r from-green-200 to-emerald-200 text-green-800 text-sm font-bold px-4 py-2 rounded-full border border-green-300">
                      {order.combo.discount}% de desconto aplicado
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Data da compra: {formatDate(order.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl p-10 border border-green-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <span>Dados do Participante</span>
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Nome</label>
                <p className="text-gray-800 font-bold text-lg">{order.customer.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">E-mail</label>
                <p className="text-gray-800 font-semibold">{order.customer.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Telefone</label>
                <p className="text-gray-800 font-semibold">{order.customer.phone}</p>
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">CPF</label>
                <p className="text-gray-800 font-semibold">{order.customer.document}</p>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Endereço</label>
                </div>
                <p className="text-gray-800 font-semibold">
                  {order.customer.address.street}, {order.customer.address.number}
                  {order.customer.address.complement && `, ${order.customer.address.complement}`}
                  <br />
                  {order.customer.address.neighborhood} - {order.customer.address.city}/{order.customer.address.state}
                  <br />
                  CEP: {order.customer.address.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-16 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-12 border border-gray-200">
          <h2 className="text-4xl font-black text-gray-800 mb-10 text-center">
            Próximos Passos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-black text-xl">1</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Confirmação por E-mail</h3>
              <p className="text-gray-600 font-medium">
                Você receberá um e-mail com todos os detalhes do seu pedido em alguns minutos.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-black text-xl">2</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Aguarde o Sorteio</h3>
              <p className="text-gray-600 font-medium">
                Seus números já estão participando! Fique atento às nossas comunicações.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-black text-xl">3</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Divulgação</h3>
              <p className="text-gray-600 font-medium">
                Os resultados serão divulgados nas nossas redes sociais e por e-mail.
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-6">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-3 mx-auto">
              <Download className="h-6 w-6" />
              <span>Baixar Comprovante</span>
            </button>
            
            <button
              onClick={onReset}
              className="text-blue-600 hover:text-blue-700 font-bold text-lg flex items-center space-x-2 mx-auto bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Fazer Nova Compra</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}