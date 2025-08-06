
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { getExercises } from '../services/storage';
import type { Exercise } from '../types';

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
      <Typography variant="h4" gutterBottom>
        Exercises
      </Typography>
      <Button component={Link} to="/exercises/new" variant="contained" color="primary">
        Add Exercise
      </Button>
      <List>
        {exercises.map(exercise => (
          <ListItem key={exercise.id} component={Link} to={`/exercises/${exercise.id}/edit`}>
            <ListItemText primary={exercise.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ExerciseListPage;
