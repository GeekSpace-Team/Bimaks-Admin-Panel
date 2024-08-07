import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { DataType } from "../../type/types";

interface EditProductProps {
  visible: boolean;
  onClose: () => void;
  product: DataType | null;
}

const EditProduct: React.FC<EditProductProps> = ({
  visible,
  onClose,
  product,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (product) {
      form.setFieldsValue({
        image: product.image,
        title_tm: product.title_tm,
        title_en: product.title_en,
        title_ru: product.title_ru,
        short_tm: product.short_tm,
        short_en: product.short_en,
        short_ru: product.short_ru,
        desc_tm: product.desc_tm,
        desc_en: product.desc_en,
        desc_ru: product.desc_ru,
      });
    }
  }, [product, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log("Updated values: ", values);
        // Handle update product logic here
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
      width="100%"
      style={{ top: 0 }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please input the image URL!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title_tm"
          label="Title (TM)"
          rules={[{ required: true, message: "Please input the title in TM!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title_en"
          label="Title (EN)"
          rules={[{ required: true, message: "Please input the title in EN!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title_ru"
          label="Title (RU)"
          rules={[{ required: true, message: "Please input the title in RU!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="short_tm"
          label="Short Description (TM)"
          rules={[
            {
              required: true,
              message: "Please input the short description in TM!",
            },
          ]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="short_en"
          label="Short Description (EN)"
          rules={[
            {
              required: true,
              message: "Please input the short description in EN!",
            },
          ]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="short_ru"
          label="Short Description (RU)"
          rules={[
            {
              required: true,
              message: "Please input the short description in RU!",
            },
          ]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="desc_tm"
          label="Description (TM)"
          rules={[
            { required: true, message: "Please input the description in TM!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="desc_en"
          label="Description (EN)"
          rules={[
            { required: true, message: "Please input the description in EN!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="desc_ru"
          label="Description (RU)"
          rules={[
            { required: true, message: "Please input the description in RU!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
