
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { getSessions } from '../services/storage';
import type { Session } from '../types';

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
      <Typography variant="h4" gutterBottom>
        Sessions
      </Typography>
      <Button component={Link} to="/sessions/new" variant="contained" color="primary">
        Add Session
      </Button>
      <List>
        {sessions.map(session => (
          <ListItem key={session.id} component={Link} to={`/sessions/${session.id}/edit`}>
            <ListItemText primary={new Date(session.date).toLocaleDateString()} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SessionListPage;
