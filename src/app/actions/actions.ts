import { ProductType } from "../types/productType";

export const addToCart = (product: ProductType) => {
  const card: ProductType[] = JSON.parse(localStorage.getItem("card") || "[]");
  const existingProductIndex = card.findIndex(
    (item) => item._id === product._id
  );
  if (existingProductIndex > -1) {
    card[existingProductIndex].stockLevel += 1;
  } else {
    card.push({ ...product, stockLevel: 1 });
  }
  localStorage.setItem("card", JSON.stringify(card));
};

export const removerFromCard = (productId: string) => {
  let cart: ProductType[] = JSON.parse(localStorage.getItem("card") || "[]");
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("card", JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart: ProductType[] = JSON.parse(localStorage.getItem("card") || "[]");
  const productIndux = cart.findIndex((item) => item._id === productId);

  if (productIndux > -1 && cart[productIndux].stockLevel > 0) {
    cart[productIndux].stockLevel = quantity;
  }
};
export const getCartItems=():ProductType[] => {
    return JSON.parse(localStorage.getItem("card") || "[]"); 
}