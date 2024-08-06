import { useState } from "react";

interface Product {
  key: string;
  id: number;
  image: string;
  title_tm: string;
  title_ru: string;
  title_en: string;
  short_tm: string;
  short_ru: string;
  short_en: string;
  desc_tm: string;
  desc_ru: string;
  desc_en: string;
  group: string | null;
  created_at: string;
  updated_at: string;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      key: "1",
      id: 1,
      image: "https://via.placeholder.com/150",
      title_tm: "Mahsulat 1",
      title_ru: "Продукт 1",
      title_en: "Product 1",
      short_tm: "Gysga düşündiriş türkmençe.",
      short_ru: "Краткое описание на русском.",
      short_en: "Short description in English.",
      desc_tm: "<h1>Türkmençe düşündiriş</h1>",
      desc_ru: "<h1>Описание на русском</h1>",
      desc_en: "<h1>Description in English</h1>",
      group: null,
      created_at: "2024-08-06T07:04:30.755Z",
      updated_at: "2024-08-06T07:04:30.755Z",
    },
  ]);

  const addProduct = (
    product: Omit<Product, "key" | "id" | "created_at" | "updated_at">
  ) => {
    const newProduct = {
      ...product,
      key: String(products.length + 1),
      id: products.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.key === updatedProduct.key ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (key: string) => {
    setProducts(products.filter((product) => product.key !== key));
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
  };
};

export { useProducts };
