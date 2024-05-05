import AuthType from '@/types/AuthType';
import RecipeType from '@/types/RecipeType';
import StepType from '@/types/StepType';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Action = 
  | { type: 'LOG_OUT'; payload: null }
  | { type: 'LOG_IN'; payload: string}


const initialState: AuthType = {id:null};

const reducer = (state: AuthType, action: Action): AuthType => {
  switch (action.type) {
    case 'LOG_IN':
      console.log("New log in")
      return {id:action.payload}
    case 'LOG_OUT':
      return {id:null};
    default:
      return state;
  }
};

const AuthContext = createContext<{ state: AuthType; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
