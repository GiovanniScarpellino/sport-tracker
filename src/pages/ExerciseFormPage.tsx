import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, InputNumber } from 'antd';
import { getExercise, saveExercise } from '../services/storage';
import type { Exercise } from '../types';

const { Title } = Typography;

const ExerciseFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const fetchExercise = async () => {
        const data = await getExercise(id);
        if (data) {
          form.setFieldsValue(data);
        }
      };
      fetchExercise();
    }
  }, [id, form]);

  const onFinish = async (values: any) => {
    const newExercise = { ...values, id: id || new Date().toISOString() } as Exercise;
    await saveExercise(newExercise);
    navigate('/exercises');
  };

  return (
    <>
      <Title>{id ? 'Edit' : 'Add'} Exercise</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="defaultSeries" label="Default Series" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="defaultReps" label="Default Reps" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="defaultRepsDuration" label="Default Reps Duration (s)" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="defaultWeight" label="Default Weight (kg)" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ExerciseFormPage;