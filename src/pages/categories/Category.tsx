import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import styled from "styled-components";
import axios from "axios";

const StyledButton = styled(Button)`
  margin-bottom: 16px;
`;

interface Category {
  id?: number;
  name_tm: string;
  name_en: string;
  name_ru: string;
  image?: string;
  created_at?: string;
}

const fetchCategories = async () => {
  try {
    const response = await axios.get("http://95.85.121.153:5634/product-group");
    return response.data;
  } catch (error) {
    message.error("Failed to fetch categories");
    throw error;
  }
};

const addCategory = async (category: FormData) => {
  try {
    const response = await axios.post(
      "http://95.85.121.153:5634/product-group",
      category,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Failed to add category");
    throw error;
  }
};

const updateCategory = async (category: FormData) => {
  try {
    const response = await axios.patch(
      `http://95.85.121.153:5634/product-group/${category.get("id")}`,
      category,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Failed to update category");
    throw error;
  }
};

const deleteCategory = async (id: number) => {
  try {
    await axios.delete(`http://95.85.121.153:5634/product-group/${id}`);
  } catch (error) {
    message.error("Failed to delete category");
    throw error;
  }
};

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        message.error("Failed to fetch categories");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        name_tm: editingCategory.name_tm,
        name_en: editingCategory.name_en,
        name_ru: editingCategory.name_ru,
      });
    } else {
      form.resetFields();
    }
  }, [editingCategory, form]);

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalVisible(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    deleteCategory(id)
      .then(() => {
        message.success("Category deleted successfully");
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch(() => message.error("Failed to delete category"));
  };

  const handleModalOk = async (values: any) => {
    const formData = new FormData();
    formData.append("name_tm", values.name_tm);
    formData.append("name_en", values.name_en);
    formData.append("name_ru", values.name_ru);

    const fileList = values.file?.fileList || [];
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      if (file) {
        formData.append("file", file);
      }
    }

    try {
      if (editingCategory) {
        formData.append("id", editingCategory.id!.toString());
        await updateCategory(formData);
        message.success("Category updated successfully");
      } else {
        await addCategory(formData);
        message.success("Category added successfully");
      }
      setIsModalVisible(false);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to save category");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info: any) => {
    // Ensure fileList is an array
    if (info.fileList && Array.isArray(info.fileList)) {
      const file = info.fileList[0]?.originFileObj;
      if (file) {
        form.setFieldsValue({ file: [info.fileList[0]] });
      }
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img src={text} alt="Category" style={{ width: 50, height: 50 }} />
      ),
    },
    { title: "Name (Turkmen)", dataIndex: "name_tm", key: "name_tm" },
    { title: "Name (English)", dataIndex: "name_en", key: "name_en" },
    { title: "Name (Russian)", dataIndex: "name_ru", key: "name_ru" },
    {
      title: "Actions",
      key: "actions",
      render: (record: Category) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id!)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <StyledButton type="primary" onClick={handleAdd}>
        Add Category
      </StyledButton>
      <Table dataSource={categories} columns={columns} rowKey="id" />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleModalOk}>
          <Form.Item
            name="name_tm"
            label="Category Name (Turkmen)"
            rules={[
              {
                required: true,
                message: "Please enter the category name (Turkmen)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_en"
            label="Category Name (English)"
            rules={[
              {
                required: true,
                message: "Please enter the category name (English)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_ru"
            label="Category Name (Russian)"
            rules={[
              {
                required: true,
                message: "Please enter the category name (Russian)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="file"
            label="Category Image"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => e.fileList}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
