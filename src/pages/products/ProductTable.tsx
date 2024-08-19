// components/ProductTable.tsx
import React from "react";
import { Table, Space, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataType } from "../../type/types";

interface ProductTableProps {
  data: DataType[];
  onDelete: (key: React.Key) => void;
  onEdit: (record: DataType) => void; // New prop for handling edit
}

const ProductTable: React.FC<ProductTableProps> = ({
  data,
  onDelete,
  onEdit,
}) => {
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
      render: (text: string) => (
        <div style={{ height: 80, overflow: "auto", textOverflow: "ellipsis" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Описание (RU)",
      dataIndex: "desc_ru",
      key: "desc_ru",
      width: 350,
      render: (text: string) => (
        <div
          style={{ height: 100, overflow: "auto", textOverflow: "ellipsis" }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Действие",
      key: "operation",
      fixed: "right",
      width: 250, // Increased width to accommodate both buttons
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            Редактировать
          </Button>
          <Button type="link" danger onClick={() => onDelete(record.key)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />;
};

export default ProductTable;
