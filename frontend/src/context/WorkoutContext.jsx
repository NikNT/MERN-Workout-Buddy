import { createContext, useReducer } from "react";
import { workoutReducer } from "./WorkoutReducer";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
