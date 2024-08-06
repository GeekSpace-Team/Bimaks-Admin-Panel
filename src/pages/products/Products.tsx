// src/pages/products/Products.tsx
import { FC, useState } from "react";
import { Button, Modal } from "antd";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Products: FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const showAddModal = () => setIsAddModalVisible(true);
  const showEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalVisible(true);
  };
  const hideModals = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: "30px" }}
        onClick={showAddModal}
      >
        Add Product
      </Button>
      <ProductTable onEdit={showEditModal} />
      <Modal
        title="Add Product"
        visible={isAddModalVisible}
        onCancel={hideModals}
        footer={null}
        width="100%"
        style={{ top: 0 }}
      >
        <AddProduct onClose={hideModals} />
      </Modal>
      <Modal
        title="Edit Product"
        visible={isEditModalVisible}
        onCancel={hideModals}
        footer={null}
        width="100%"
        style={{ top: 0 }}
      >
        <EditProduct product={editingProduct} onClose={hideModals} />
      </Modal>
    </div>
  );
};

export default Products;
