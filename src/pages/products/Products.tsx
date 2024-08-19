// components/Products.tsx
import React, { useState } from "react";
import { Button, message } from "antd";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import useProducts from "../../hooks/useProducts";
import axios from "axios";
import { DataType } from "../../type/types";

const Products: React.FC = () => {
  const { data, fetchProducts } = useProducts();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);

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

  const handleEdit = (product: DataType) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalVisible(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddProductSuccess = () => {
    fetchProducts(); // Refresh product list after adding a product
    setIsAddModalVisible(false);
  };

  const handleEditProductSuccess = () => {
    fetchProducts(); // Refresh product list after editing a product
    setIsEditModalVisible(false);
    setSelectedProduct(null);
  };

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
      <ProductTable data={data} onDelete={handleDelete} onEdit={handleEdit} />
      <AddProduct
        visible={isAddModalVisible}
        onClose={handleAddModalClose}
        onSuccess={handleAddProductSuccess}
      />
      {selectedProduct && (
        <EditProduct
          visible={isEditModalVisible}
          onClose={handleEditModalClose}
          product={selectedProduct}
          onSuccess={handleEditProductSuccess}
        />
      )}
    </div>
  );
};

export default Products;
