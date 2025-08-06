import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Table, Skeleton } from 'antd';
import { getExercise, getSessions } from '../services/storage';
import type { Session } from '../types';

const { Title } = Typography;

const ExerciseNameCell: React.FC<{ exerciseId: string }> = ({ exerciseId }) => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getExercise(exerciseId).then(exercise => {
      if (mounted) setName(exercise?.name || '-');
    });
    return () => { mounted = false; };
  }, [exerciseId]);

  return name ? <span>{name}</span> : <Skeleton.Input size="small" active />;
};

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text: string, record: Session) => (
      <Link to={`/sessions/${record.id}/edit`}>{new Date(text).toLocaleDateString()}</Link>
    ),
  },
  {
    title: 'Exercise',
    dataIndex: 'exerciseId',
    key: 'exerciseId',
    render: (exerciseId: string) => <ExerciseNameCell exerciseId={exerciseId} />,
  },
  {
    title: 'Series',
    dataIndex: 'series',
    key: 'series',
    render: (text: string) => text ? text : '-',
  },
  {
    title: 'Reps',
    dataIndex: 'reps',
    key: 'reps',
    render: (text: string) => text ? text : '-',
  },
  {
    title: 'Reps duration',
    dataIndex: 'repsDuration',
    key: 'repsDuration',
    render: (text: string) => text ? `${text}s` : '-',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    render: (text: string) => text ? `${text}kg` : '-',
  },
];

const SessionListPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await getSessions();
      setSessions(data);
    };
    fetchSessions();
  }, []);

  return (
    <>
      <Title>Sessions</Title>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/sessions/new">Add Session</Link>
      </Button>
      <Table columns={columns} dataSource={sessions} rowKey="id" />
    </>
  );
};

export default SessionListPage;