export interface Product {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  price: string;
  priceValue: number;
  images: string[];
}

export const products: Product[] = [
  {
    id: "B0848F7Z2J",
    name: "Apple Watch Series 5 (GPS + Cellular, 40mm) Stainless Steel Smartwatch",
    colorName: "Stainless Steel (White)",
    colorHex: "#f0f0f0", // Light color for white/silver indicator
    price: "4,401,733đ",
    priceValue: 4401733,
    images: [
      "/whiteapplewatch/whiteapw1.jpg",
      "/whiteapplewatch/whiteapw2.jpg",
      "/whiteapplewatch/whiteapw3.jpg",
      "/whiteapplewatch/whiteapw4.jpg",
      "/whiteapplewatch/whiteapw5.jpg",
      "/whiteapplewatch/whiteapw6.jpg",
    ]
  },
  {
    id: "B082VLCYKN",
    name: "Apple Watch Series 5 (GPS + Cellular, 44mm) Gold Aluminum Case with Pink Sand Sport Band",
    colorName: "Gold Aluminum / Pink Sand",
    colorHex: "#fadadd", // Pink color for indicator
    price: "3,832,062đ",
    priceValue: 3832062,
    images: [
      "/pinkapplewatch/pinkapw1.jpg",
      "/pinkapplewatch/pinkapw2.jpg",
      "/pinkapplewatch/pinkapw3.jpg",
      "/pinkapplewatch/pinkapw4.jpg",
      "/pinkapplewatch/pinkapw5.jpg",
      "/pinkapplewatch/pinkapw6.jpg",
    ]
  },
  {
    id: "B083M8DP6X",
    name: "Apple Watch Series 5 (GPS, 44mm) Space Gray Aluminum Case with Black Sport Band",
    colorName: "Space Gray Aluminum / Black",
    colorHex: "#3b3b3b", // Dark color for black indicator
    price: "4,292,432đ",
    priceValue: 4292432,
    images: [
      "/blackapplewatch/blackapw1.jpg",
      "/blackapplewatch/blackapw2.jpg",
      "/blackapplewatch/blackapw3.jpg",
      "/blackapplewatch/blackapw4.jpg",
      "/blackapplewatch/blackapw5.jpg",
    ]
  }
];
