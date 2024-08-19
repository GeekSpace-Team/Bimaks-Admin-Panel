import React, { useState, useEffect } from "react";
import { Table, Space, Button, message } from "antd";
import axios from "axios";
import { ColumnsType } from "antd/es/table";
import { DataType } from "../../type/types";
import AddProduct from "./AddProduct";

const Products: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const groupIds = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40,
      ];

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
          short_en: product.short_en.slice(0, 100),
          short_ru: product.short_ru.slice(0, 100),
          desc_en: product.desc_en.slice(11, 100),
          desc_ru: product.desc_ru.slice(11, 100),
          id: product.id,
        }))
      );

      setData(products);
    } catch (error) {
      message.error("Не удалось загрузить продукты");
    }
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleDelete = async (key: React.Key) => {
    try {
      await axios.delete(`http://95.85.121.153:5634/product/${key}`);
      message.success("Продукт успешно удален");
      fetchProducts(); // Refresh product list
    } catch (error) {
      message.error("Не удалось удалить продукт");
    }
  };

  const handleAddModalClose = () => {
    setIsAddModalVisible(false);
  };

  const handleAddProductSuccess = () => {
    fetchProducts(); // Refresh product list after adding a product
    setIsAddModalVisible(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Изображение",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img src={text} alt="product" style={{ width: 50, height: 50 }} />
      ),
      width: 130,
    },
    {
      title: "Название (EN)",
      dataIndex: "title_en",
      key: "title_en",
      width: 250,
    },
    {
      title: "Название (RU)",
      dataIndex: "title_ru",
      key: "title_ru",
      width: 250,
    },
    {
      title: "Краткое описание (EN)",
      dataIndex: "short_en",
      key: "short_en",
      width: 250,
    },
    {
      title: "Краткое описание (RU)",
      dataIndex: "short_ru",
      key: "short_ru",
      width: 250,
    },
    {
      title: "Описание (EN)",
      dataIndex: "desc_en",
      key: "desc_en",
      width: 350,
    },
    {
      title: "Описание (RU)",
      dataIndex: "desc_ru",
      key: "desc_ru",
      width: 350,
    },
    {
      title: "Действие",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Продукты</h2>
        <Button type="primary" onClick={handleAdd}>
          Добавить продукт
        </Button>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      <AddProduct
        visible={isAddModalVisible}
        onClose={handleAddModalClose}
        onSuccess={handleAddProductSuccess}
      />
    </div>
  );
};

export default Products;
