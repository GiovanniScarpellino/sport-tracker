import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Typography, Form, Input, Button, InputNumber, Row, Col } from 'antd'; // Added Row, Col
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
          // Ensure number fields have a default if they are null/undefined
          form.setFieldsValue({
            ...data,
            defaultSeries: data.defaultSeries ?? 0,
            defaultReps: data.defaultReps ?? 0,
            defaultRepsDuration: data.defaultRepsDuration ?? 0,
            defaultWeight: data.defaultWeight ?? 0,
          });
        }
      };
      fetchExercise();
    } else {
      // Set initial values for new exercises
      form.setFieldsValue({
        name: '',
        defaultSeries: 0,
        defaultReps: 0,
        defaultRepsDuration: 0,
        defaultWeight: 0,
      });
    }
  }, [id, form]);

  const onFinish = async (values: Omit<Exercise, 'id'>) => {
    const newExercise = { ...values, id: id || new Date().toISOString() } as Exercise;
    await saveExercise(newExercise);
    navigate('/exercises');
  };

  return (
    <>
      <Title>{id ? 'Edit' : 'Add'} Exercise</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}> {/* Add Row with gutter */}
          <Col xs={24} md={12}> {/* Full width on extra small, half on medium and up */}
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> {/* Full width on extra small, half on medium and up */}
            <Form.Item name="defaultSeries" label="Default Series" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} /> {/* Added min={0} */}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="defaultReps" label="Default Reps" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} /> {/* Added min={0} */}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="defaultRepsDuration" label="Default Reps Duration (s)" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} /> {/* Added min={0} */}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="defaultWeight" label="Default Weight (kg)" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} /> {/* Added min={0} */}
            </Form.Item>
          </Col>
        </Row>

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