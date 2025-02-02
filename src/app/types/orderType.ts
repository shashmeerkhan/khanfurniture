
export type OrderType = {

    customerName: string;
  
    customerEmail: string;
  
    shippingAddress: string;
  
    items: {
  
      id: number;
  
      name: string;
  
      quantity: number;
  
      price: number;
  
    }[];
  
    totalAmount: number;
  
  };
  