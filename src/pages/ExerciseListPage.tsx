import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Table } from 'antd';
import { getExercises } from '../services/storage';
import type { Exercise } from '../types';

const { Title } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: Exercise) => <Link to={`/exercises/${record.id}/edit`}>{text}</Link>,
  },
];

const ExerciseListPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getExercises();
      setExercises(data);
    };
    fetchExercises();
  }, []);

  return (
    <>
      <Title>Exercises</Title>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/exercises/new">Add Exercise</Link>
      </Button>
      <Table columns={columns} dataSource={exercises} rowKey="id" />
    </>
  );
};

export default ExerciseListPage;