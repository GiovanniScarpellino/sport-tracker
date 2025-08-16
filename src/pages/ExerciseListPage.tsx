import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Table, Row, Col, Card, List } from 'antd'; // Added Card, List
import { Grid } from 'antd'; // Import Grid
const { useBreakpoint } = Grid; // Destructure useBreakpoint from Grid
import { getExercises } from '../services/storage';
import type { Exercise } from '../types';

const { Title, Text } = Typography; // Added Text

// New component for mobile list view
const ExerciseListPanelItem: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
  <List.Item>
    <Card size="small" style={{ width: '100%' }}>
      <p><Text strong>Name:</Text> <Link to={`/exercises/${exercise.id}/edit`}>{exercise.name}</Link></p>
      <p><Text strong>Default Series:</Text> {exercise.defaultSeries}</p>
      <p><Text strong>Default Reps:</Text> {exercise.defaultReps}</p>
      <p><Text strong>Default Reps Duration:</Text> {exercise.defaultRepsDuration}s</p>
      <p><Text strong>Default Weight:</Text> {exercise.defaultWeight}kg</p>
    </Card>
  </List.Item>
);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: Exercise) => <Link to={`/exercises/${record.id}/edit`}>{text}</Link>,
  },
  {
    title: 'Default Series',
    dataIndex: 'defaultSeries',
    key: 'defaultSeries',
  },
  {
    title: 'Default Reps',
    dataIndex: 'defaultReps',
    key: 'defaultReps',
  },
  {
    title: 'Default Reps Duration',
    dataIndex: 'defaultRepsDuration',
    key: 'defaultRepsDuration',
    render: (text: number) => `${text}s`,
  },
  {
    title: 'Default Weight',
    dataIndex: 'defaultWeight',
    key: 'defaultWeight',
    render: (text: number) => `${text}kg`,
  },
];

const ExerciseListPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const screens = useBreakpoint(); // Use breakpoint hook

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
      <Row>
        <Col xs={24}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            <Link to="/exercises/new">Add Exercise</Link>
          </Button>
        </Col>
      </Row>
      {screens.md ? ( // Render Table for medium and larger screens
        <Table columns={columns} dataSource={exercises} rowKey="id" scroll={{ x: 'max-content' }} />
      ) : ( // Render List for small screens
        <List
          dataSource={exercises}
          renderItem={exercise => <ExerciseListPanelItem key={exercise.id} exercise={exercise} />}
          rowKey="id"
        />
      )}
    </>
  );
};

export default ExerciseListPage;