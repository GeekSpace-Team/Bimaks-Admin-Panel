// hooks/useProducts.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { DataType } from "../type/types";

const useProducts = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const groupIds = Array.from({ length: 40 }, (_, i) => i + 1);
      const responses = await Promise.all(
        groupIds.map((groupId) =>
          axios.get(
            `http://95.85.121.153:5634/product/product-by-group?group=${groupId}`
          )
        )
      );
      const products = responses.flatMap((response) =>
        response.data.map((product: any) => ({
          key: product.id,
          image: product.image,
          title_en: product.title_en,
          title_ru: product.title_ru,
          short_en: product.short_en,
          short_ru: product.short_ru,
          desc_en: product.desc_en,
          desc_ru: product.desc_ru,
          id: product.id,
        }))
      );
      setData(products);
    } catch (error) {
      message.error("Не удалось загрузить продукты");
    }
  };

  return { data, fetchProducts };
};

export default useProducts;
