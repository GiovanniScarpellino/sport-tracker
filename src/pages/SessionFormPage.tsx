
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Paper, MenuItem } from '@mui/material';
import { getSession, saveSession, getExercises } from '../services/storage';
import type { Session, Exercise } from '../types';

const SessionFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [session, setSession] = useState<Omit<Session, 'id'> | Session>({
    date: new Date(),
    exerciseId: '',
    series: 3,
    reps: 10,
    repsDuration: 60,
    weight: 10,
    notes: '',
  });

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getExercises();
      setExercises(data);
      if (data.length > 0) {
        setSession(prev => ({ ...prev, exerciseId: data[0].id }));
      }
    };
    fetchExercises();

    if (id) {
      const fetchSession = async () => {
        const data = await getSession(id);
        if (data) {
          setSession(data);
        }
      };
      fetchSession();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSession(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSession = { ...session, id: id || new Date().toISOString() } as Session;
    await saveSession(newSession);
    navigate('/sessions');
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit' : 'Add'} Session
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="date"
          label="Date"
          type="date"
          value={new Date(session.date).toISOString().split('T')[0]}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          select
          name="exerciseId"
          label="Exercise"
          value={session.exerciseId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {exercises.map(exercise => (
            <MenuItem key={exercise.id} value={exercise.id}>
              {exercise.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="series"
          label="Series"
          type="number"
          value={session.series}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="reps"
          label="Reps"
          type="number"
          value={session.reps}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="repsDuration"
          label="Reps Duration (s)"
          type="number"
          value={session.repsDuration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="weight"
          label="Weight (kg)"
          type="number"
          value={session.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="notes"
          label="Notes"
          value={session.notes}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default SessionFormPage;
