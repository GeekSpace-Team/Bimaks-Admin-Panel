import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import styled from "styled-components";
import axios from "axios";

const StyledButton = styled(Button)`
  margin-bottom: 16px;
`;

interface Category {
  id?: number;
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
    message.error("Не удалось загрузить категории");
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
    message.error("Не удалось добавить категорию");
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
    message.error("Не удалось обновить категорию");
    throw error;
  }
};

const deleteCategory = async (id: number) => {
  try {
    await axios.delete(`http://95.85.121.153:5634/product-group/${id}`);
  } catch (error) {
    message.error("Не удалось удалить категорию");
    throw error;
  }
};

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        message.error("Не удалось загрузить категории");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        name_en: editingCategory.name_en,
        name_ru: editingCategory.name_ru,
        file: [],
      });
      setFileList(
        editingCategory.image ? [{ url: editingCategory.image }] : []
      );
    } else {
      form.resetFields();
      setFileList([]);
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
        message.success("Категория успешно удалена");
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch(() => message.error("Не удалось удалить категорию"));
  };

  const handleModalOk = async (values: any) => {
    const formData = new FormData();
    formData.append("name_en", values.name_en);
    formData.append("name_ru", values.name_ru);

    // Handle image file
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      if (file) {
        formData.append("file", file);
      }
    }

    // Append default value for Turkmen name
    formData.append("name_tm", "тест");

    try {
      if (editingCategory) {
        formData.append("id", editingCategory.id!.toString());
        await updateCategory(formData);
        message.success("Категория успешно обновлена");
      } else {
        await addCategory(formData);
        message.success("Категория успешно добавлена");
      }
      setIsModalVisible(false);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Не удалось сохранить категорию");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info: any) => {
    if (info.fileList && Array.isArray(info.fileList)) {
      setFileList(info.fileList);
    }
  };

  const columns = [
    {
      title: "Изображение",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img src={text} alt="Категория" style={{ width: 50, height: 50 }} />
      ),
    },
    { title: "Название (Английский)", dataIndex: "name_en", key: "name_en" },
    { title: "Название (Русский)", dataIndex: "name_ru", key: "name_ru" },
    {
      title: "Действия",
      key: "actions",
      render: (record: Category) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => handleEdit(record)}
          >
            Редактировать
          </Button>
          <Button onClick={() => handleDelete(record.id!)}>Удалить</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <StyledButton type="primary" onClick={handleAdd}>
        Добавить категорию
      </StyledButton>
      <Table dataSource={categories} columns={columns} rowKey="id" />

      <Modal
        title={
          editingCategory ? "Редактировать категорию" : "Добавить категорию"
        }
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleModalOk}>
          <Form.Item
            name="name_en"
            label="Название категории (Английский)"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название категории (Английский)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_ru"
            label="Название категории (Русский)"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название категории (Русский)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="file"
            label="Изображение категории"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => e.fileList}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
            >
              <Button>Загрузить</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
