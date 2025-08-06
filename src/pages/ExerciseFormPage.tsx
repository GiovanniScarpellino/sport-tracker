
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Paper } from '@mui/material';
import { getExercise, saveExercise } from '../services/storage';
import type { Exercise } from '../types';

const ExerciseFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Omit<Exercise, 'id'> | Exercise>({
    name: '',
    defaultSeries: 3,
    defaultReps: 10,
    defaultRepsDuration: 60,
    defaultWeight: 10,
  });

  useEffect(() => {
    if (id) {
      const fetchExercise = async () => {
        const data = await getExercise(id);
        if (data) {
          setExercise(data);
        }
      };
      fetchExercise();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExercise(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExercise = { ...exercise, id: id || new Date().toISOString() } as Exercise;
    await saveExercise(newExercise);
    navigate('/exercises');
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit' : 'Add'} Exercise
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={exercise.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="defaultSeries"
          label="Default Series"
          type="number"
          value={exercise.defaultSeries}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="defaultReps"
          label="Default Reps"
          type="number"
          value={exercise.defaultReps}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="defaultRepsDuration"
          label="Default Reps Duration (s)"
          type="number"
          value={exercise.defaultRepsDuration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="defaultWeight"
          label="Default Weight (kg)"
          type="number"
          value={exercise.defaultWeight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default ExerciseFormPage;
