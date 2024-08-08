import React, { useState, useEffect } from "react";
import { Table, Space, Button, message } from "antd";
import axios from "axios";
import { ColumnsType } from "antd/es/table";
import { DataType } from "../../type/types";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";

const Products: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);

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

      // Combine the results from all responses
      const products = responses.flatMap((response) =>
        response.data.map((product: any) => ({
          key: product.id,
          image: product.image,
          title_tm: product.title_tm,
          title_en: product.title_en,
          title_ru: product.title_ru,
          short_tm: product.short_tm.slice(0, 100),
          short_en: product.short_en.slice(0, 100),
          short_ru: product.short_ru.slice(0, 100),
          desc_tm: product.desc_tm.slice(11, 100),
          desc_en: product.desc_en.slice(11, 100),
          desc_ru: product.desc_ru.slice(11, 100),
          id: product.id,
        }))
      );

      setData(products);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleEdit = (record: DataType) => {
    setSelectedProduct(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (key: React.Key) => {
    try {
      await axios.delete(`http://95.85.121.153:5634/product/${key}`);
      message.success("Product deleted successfully");
      fetchProducts(); // Refresh product list
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleAddModalClose = () => {
    setIsAddModalVisible(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
  };

  const handleAddProductSuccess = () => {
    fetchProducts(); // Refresh product list after adding a product
    setIsAddModalVisible(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img src={text} alt="product" style={{ width: 50, height: 50 }} />
      ),
      width: 130,
    },
    {
      title: "Title (TM)",
      dataIndex: "title_tm",
      key: "title_tm",
      width: 250,
    },
    {
      title: "Title (EN)",
      dataIndex: "title_en",
      key: "title_en",
      width: 250,
    },
    {
      title: "Title (RU)",
      dataIndex: "title_ru",
      key: "title_ru",
      width: 250,
    },
    {
      title: "Short Description (TM)",
      dataIndex: "short_tm",
      key: "short_tm",
      width: 250,
    },
    {
      title: "Short Description (EN)",
      dataIndex: "short_en",
      key: "short_en",
      width: 250,
    },
    {
      title: "Short Description (RU)",
      dataIndex: "short_ru",
      key: "short_ru",
      width: 250,
    },
    {
      title: "Description (TM)",
      dataIndex: "desc_tm",
      key: "desc_tm",
      width: 350,
    },
    {
      title: "Description (EN)",
      dataIndex: "desc_en",
      key: "desc_en",
      width: 350,
    },
    {
      title: "Description (RU)",
      dataIndex: "desc_ru",
      key: "desc_ru",
      width: 350,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Delete
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
        <h2>Products</h2>
        <Button type="primary" onClick={handleAdd}>
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      <AddProduct
        visible={isAddModalVisible}
        onClose={handleAddModalClose}
        onSuccess={handleAddProductSuccess} // Pass the success callback
      />
      {selectedProduct && (
        <EditProduct
          visible={isEditModalVisible}
          onClose={handleEditModalClose}
          product={selectedProduct}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
