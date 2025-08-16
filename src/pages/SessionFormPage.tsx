import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, InputNumber, Select, DatePicker, Row, Col } from 'antd'; // Added Row, Col
import { getSession, saveSession, getExercises } from '../services/storage';
import type { Session, Exercise } from '../types';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const SessionFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const exerciseData = await getExercises();
      setExercises(exerciseData);

      if (id) {
        const sessionData = await getSession(id);
        if (sessionData) {
          form.setFieldsValue({
            ...sessionData,
            date: dayjs(sessionData.date),
            series: sessionData.series ?? 0, // Ensure default for numbers
            reps: sessionData.reps ?? 0,
            repsDuration: sessionData.repsDuration ?? 0,
            weight: sessionData.weight ?? 0,
          });
        }
      } else if (exerciseData.length > 0) {
        const defaultExercise = exerciseData[0];
        form.setFieldsValue({
          exerciseId: defaultExercise.id,
          series: defaultExercise.defaultSeries ?? 0, // Ensure default for numbers
          reps: defaultExercise.defaultReps ?? 0,
          repsDuration: defaultExercise.defaultRepsDuration ?? 0,
          weight: defaultExercise.defaultWeight ?? 0,
          date: dayjs(),
        });
      }
    };

    fetchInitialData();
  }, [id, form]);

  const onFinish = async (values: Omit<Session, 'id' | 'date'> & { date: dayjs.Dayjs }) => {
    const newSession = { ...values, id: id || new Date().toISOString(), date: values.date.toDate() } as Session;
    await saveSession(newSession);
    navigate('/sessions');
  };

  const handleExerciseChange = (value: string) => {
    const selectedExercise = exercises.find(ex => ex.id === value);
    if (selectedExercise) {
      form.setFieldsValue({
        series: selectedExercise.defaultSeries ?? 0, // Ensure default for numbers
        reps: selectedExercise.defaultReps ?? 0,
        repsDuration: selectedExercise.defaultRepsDuration ?? 0,
        weight: selectedExercise.defaultWeight ?? 0,
      });
    }
  };

  return (
    <>
      <Title>{id ? 'Edit' : 'Add'} Session</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="exerciseId" label="Exercise" rules={[{ required: true }]}>
              <Select onChange={handleExerciseChange} style={{ width: '100%' }}>
                {exercises.map(exercise => (
                  <Option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="series" label="Series" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="reps" label="Reps" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="repsDuration" label="Reps Duration (s)" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="weight" label="Weight (kg)" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea rows={4} />
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

export default SessionFormPage;