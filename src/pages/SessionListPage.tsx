import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Table } from 'antd';
import { getSessions } from '../services/storage';
import type { Session } from '../types';

const { Title } = Typography;

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text: string, record: Session) => <Link to={`/sessions/${record.id}/edit`}>{new Date(text).toLocaleDateString()}</Link>,
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