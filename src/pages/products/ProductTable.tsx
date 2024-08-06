import React, { FC } from "react";
import { Table, Button, Popconfirm } from "antd";
import { useProducts } from "./useProducts"; // Custom hook to manage products

const ProductTable: FC<{ onEdit: (product: any) => void }> = ({ onEdit }) => {
  const { products, deleteProduct } = useProducts();

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img src={text} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    { title: "Name (RU)", dataIndex: "title_ru", key: "title_ru" },
    { title: "Group", dataIndex: "group", key: "group" },
    { title: "Short Description (RU)", dataIndex: "short_ru", key: "short_ru" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: any) => (
        <span>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => deleteProduct(record.key)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="key" />;
};

export default ProductTable;
