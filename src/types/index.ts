export interface ComboOption {
  id: string;
  quantity: number;
  price: number;
  discount?: number;
  popular?: boolean;
}

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Order {
  id: string;
  combo: ComboOption;
  customer: CustomerData;
  total: number;
  createdAt: Date;
}