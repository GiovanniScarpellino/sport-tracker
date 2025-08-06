
import localforage from 'localforage';
import type { Exercise, Session } from '../types';

const EXERCISES_KEY = 'exercises';
const SESSIONS_KEY = 'sessions';

// Exercises
export const getExercises = async (): Promise<Exercise[]> => {
  const exercises = await localforage.getItem<Exercise[]>(EXERCISES_KEY);
  return exercises || [];
};

export const getExercise = async (id: string): Promise<Exercise | null> => {
  const exercises = await getExercises();
  return exercises.find(exercise => exercise.id === id) || null;
};

export const saveExercise = async (exercise: Exercise): Promise<void> => {
  const exercises = await getExercises();
  const index = exercises.findIndex(e => e.id === exercise.id);
  if (index > -1) {
    exercises[index] = exercise;
  } else {
    exercises.push(exercise);
  }
  await localforage.setItem(EXERCISES_KEY, exercises);
};

export const deleteExercise = async (id: string): Promise<void> => {
  let exercises = await getExercises();
  exercises = exercises.filter(exercise => exercise.id !== id);
  await localforage.setItem(EXERCISES_KEY, exercises);
};

// Sessions
export const getSessions = async (): Promise<Session[]> => {
  const sessions = await localforage.getItem<Session[]>(SESSIONS_KEY);
  return sessions || [];
};

export const getSession = async (id: string): Promise<Session | null> => {
  const sessions = await getSessions();
  return sessions.find(session => session.id === id) || null;
};

export const saveSession = async (session: Session): Promise<void> => {
  const sessions = await getSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  if (index > -1) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  await localforage.setItem(SESSIONS_KEY, sessions);
};

export const deleteSession = async (id: string): Promise<void> => {
  let sessions = await getSessions();
  sessions = sessions.filter(session => session.id !== id);
  await localforage.setItem(SESSIONS_KEY, sessions);
};
