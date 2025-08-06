import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { ComboOption, CustomerData, Order } from "../types";

interface CheckoutProps {
  combo: ComboOption;
  onBack: () => void;
  onComplete: (order: Order) => void;
}

export default function Checkout({ combo, onBack, onComplete }: CheckoutProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    document: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!customerData.email.trim()) newErrors.email = "E-mail é obrigatório";
    if (!customerData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (!customerData.document.trim()) newErrors.document = "CPF é obrigatório";
    if (!customerData.address.street.trim())
      newErrors.street = "Rua é obrigatória";
    if (!customerData.address.number.trim())
      newErrors.number = "Número é obrigatório";
    if (!customerData.address.neighborhood.trim())
      newErrors.neighborhood = "Bairro é obrigatório";
    if (!customerData.address.city.trim())
      newErrors.city = "Cidade é obrigatória";
    if (!customerData.address.state.trim())
      newErrors.state = "Estado é obrigatório";
    if (!customerData.address.zipCode.trim())
      newErrors.zipCode = "CEP é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const order: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        combo,
        customer: customerData,
        total: combo.price,
        createdAt: new Date(),
      };
      onComplete(order);
    }
  };

  const updateCustomerData = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setCustomerData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CustomerData] as any),
          [child]: value,
        },
      }));
    } else {
      setCustomerData((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-xl transition-all duration-200 font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </button>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Ambiente Seguro
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                <Lock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  SSL Criptografado
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-black text-gray-800 mt-6">
            Finalizar Compra
          </h1>
          <p className="text-gray-600 mt-2">
            Complete seus dados para finalizar o pedido
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Dados Pessoais
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Informações para identificação
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={customerData.name}
                      onChange={(e) =>
                        updateCustomerData("name", e.target.value)
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Digite seu nome completo"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      CPF *
                    </label>
                    <input
                      type="text"
                      value={customerData.document}
                      onChange={(e) =>
                        updateCustomerData("document", e.target.value)
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.document
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="000.000.000-00"
                    />
                    {errors.document && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.document}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={customerData.email}
                        onChange={(e) =>
                          updateCustomerData("email", e.target.value)
                        }
                        className={`w-full p-4 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                          errors.email
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="seu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) =>
                          updateCustomerData("phone", e.target.value)
                        }
                        className={`w-full p-4 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                          errors.phone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Endereço de Entrega
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Local para receber seu prêmio
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      CEP *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.zipCode}
                      onChange={(e) =>
                        updateCustomerData("address.zipCode", e.target.value)
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.zipCode
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="00000-000"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.zipCode}</span>
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Rua *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.street}
                      onChange={(e) =>
                        updateCustomerData("address.street", e.target.value)
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.street
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Nome da rua"
                    />
                    {errors.street && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.street}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Número *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.number}
                      onChange={(e) =>
                        updateCustomerData("address.number", e.target.value)
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.number
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="123"
                    />
                    {errors.number && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.number}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Complemento
                    </label>
                    <input
                      type="text"
                      value={customerData.address.complement}
                      onChange={(e) =>
                        updateCustomerData("address.complement", e.target.value)
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 hover:border-gray-300"
                      placeholder="Apto, bloco, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.neighborhood}
                      onChange={(e) =>
                        updateCustomerData(
                          "address.neighborhood",
                          e.target.value
                        )
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.neighborhood
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Nome do bairro"
                    />
                    {errors.neighborhood && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.neighborhood}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.city}
                      onChange={(e) =>
                        updateCustomerData("address.city", e.target.value)
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.city
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Nome da cidade"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Estado *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.state}
                      onChange={(e) =>
                        updateCustomerData("address.state", e.target.value)
                      }
                      className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-800 ${
                        errors.state
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="SP, RJ, MG, etc."
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.state}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Resumo do Pedido
                </h2>
              </div>

              {/* Combo Selection Display */}
              <div className="bg-gradient-to-br from-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-8 mb-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-xl"></div>

                <div className="text-center relative z-10">
                  <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
                    {combo.quantity}
                  </div>
                  <div className="text-sm font-bold text-gray-600 mb-6 uppercase tracking-wider">
                    bilhetes da sorte
                  </div>

                  {combo.discount! > 0 && (
                    <div className="mb-6">
                      <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-bold px-6 py-3 rounded-full border-2 border-green-200 shadow-lg">
                        🎉 {combo.discount}% de desconto aplicado
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">
                      Combo Selecionado
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Subtotal:</span>
                    <span className="text-xs text-gray-400">
                      ({combo.quantity} bilhetes)
                    </span>
                  </div>
                  <span className="font-bold text-lg text-gray-800">
                    R$ {combo.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">
                      Taxa de processamento:
                    </span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      GRÁTIS
                    </span>
                  </div>
                  <span className="font-bold text-green-600 text-lg">
                    R$ 0,00
                  </span>
                </div>

                <div className="pt-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4">
                  <div className="flex justify-between text-2xl font-black">
                    <span className="text-gray-800">Total Final:</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      R$ {combo.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Pagamento único • Sem mensalidades
                  </p>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3 text-blue-800 mb-3">
                  <Shield className="h-6 w-6" />
                  <span className="font-bold text-lg">
                    Pagamento 100% Seguro
                  </span>
                </div>
                <p className="text-sm text-blue-700 font-medium leading-relaxed mb-4">
                  Seus dados estão protegidos com criptografia SSL de 256 bits
                </p>
                <div className="flex items-center justify-between text-xs text-blue-600">
                  <span>🔒 SSL Criptografado</span>
                  <span>🛡️ Ambiente Seguro</span>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <h3 className="font-bold text-green-800 mb-3 flex items-center space-x-2">
                  <span>✨</span>
                  <span>Benefícios Inclusos</span>
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Entrega garantida</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Suporte 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Certificado de participação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
