
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, InputNumber, Select, DatePicker } from 'antd';
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
          form.setFieldsValue({ ...sessionData, date: dayjs(sessionData.date) });
        }
      } else if (exerciseData.length > 0) {
        const defaultExercise = exerciseData[0];
        form.setFieldsValue({
          exerciseId: defaultExercise.id,
          series: defaultExercise.defaultSeries,
          reps: defaultExercise.defaultReps,
          repsDuration: defaultExercise.defaultRepsDuration,
          weight: defaultExercise.defaultWeight,
          date: dayjs(),
        });
      }
    };

    fetchInitialData();
  }, [id, form]);

  const onFinish = async (values: any) => {
    const newSession = { ...values, id: id || new Date().toISOString(), date: values.date.toDate() } as Session;
    await saveSession(newSession);
    navigate('/sessions');
  };

  const handleExerciseChange = (value: string) => {
    const selectedExercise = exercises.find(ex => ex.id === value);
    if (selectedExercise) {
      form.setFieldsValue({
        series: selectedExercise.defaultSeries,
        reps: selectedExercise.defaultReps,
        repsDuration: selectedExercise.defaultRepsDuration,
        weight: selectedExercise.defaultWeight,
      });
    }
  };

  return (
    <>
      <Title>{id ? 'Edit' : 'Add'} Session</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="exerciseId" label="Exercise" rules={[{ required: true }]}>
          <Select onChange={handleExerciseChange}>
            {exercises.map(exercise => (
              <Option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="series" label="Series" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="reps" label="Reps" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="repsDuration" label="Reps Duration (s)" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="weight" label="Weight (kg)" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={4} />
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

export default SessionFormPage;
