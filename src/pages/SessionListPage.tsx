import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Table, Skeleton, Row, Col, Card, List, Grid } from 'antd'; // Added Card, List
const { useBreakpoint } = Grid;
import { getExercise, getSessions } from '../services/storage';
import type { Session } from '../types';

const { Title, Text } = Typography; // Added Text

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

// New component for mobile list view
const SessionListPanelItem: React.FC<{ session: Session }> = ({ session }) => (
  <List.Item>
    <Card size="small" style={{ width: '100%' }}>
      <p><Text strong>Date:</Text> <Link to={`/sessions/${session.id}/edit`}>{new Date(session.date).toLocaleDateString()}</Link></p>
      <p><Text strong>Exercise:</Text> <ExerciseNameCell exerciseId={session.exerciseId} /></p>
      <p><Text strong>Series:</Text> {session.series ? session.series : '-'}</p>
      <p><Text strong>Reps:</Text> {session.reps ? session.reps : '-'}</p>
      <p><Text strong>Reps Duration:</Text> {session.repsDuration ? `${session.repsDuration}s` : '-'}</p>
      <p><Text strong>Weight:</Text> {session.weight ? `${session.weight}kg` : '-'}</p>
      {session.notes && <p><Text strong>Notes:</Text> {session.notes}</p>}
    </Card>
  </List.Item>
);

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
  const screens = useBreakpoint(); // Use breakpoint hook

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
      <Row>
        <Col xs={24}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            <Link to="/sessions/new">Add Session</Link>
          </Button>
        </Col>
      </Row>
      {screens.md ? ( // Render Table for medium and larger screens
        <Table columns={columns} dataSource={sessions} rowKey="id" scroll={{ x: 'max-content' }} />
      ) : ( // Render List for small screens
        <List
          dataSource={sessions}
          renderItem={session => <SessionListPanelItem key={session.id} session={session} />}
          rowKey="id"
        />
      )}
    </>
  );
};

export default SessionListPage;