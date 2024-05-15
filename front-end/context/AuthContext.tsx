import AuthType from '@/types/AuthType';
import RecipeType from '@/types/RecipeType';
import StepType from '@/types/StepType';
import { Auth } from 'firebase/auth';
import { useEffect } from 'react';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
type Action = 
  | { type: 'LOG_OUT'; payload: null }
  | { type: 'LOG_IN'; payload: AuthType}


  const initialState: AuthType | null = (() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        return JSON.parse(token);
      }
    }
    return null;
  })();

const reducer = (state: AuthType|null, action: Action): AuthType|null => {
  switch (action.type) {
    case 'LOG_IN':
      // console.log(action.payload);
      localStorage.setItem('authToken', JSON.stringify(action.payload));
      return action.payload;
    case 'LOG_OUT':
      localStorage.removeItem('authToken');
      return null;
    default:
      return state;
  }
};

const AuthContext = createContext<{ state: AuthType|null; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {

    const token = localStorage.getItem('authToken');
    if (token) {
      // console.log(token)
      dispatch({ type: 'LOG_IN', payload: JSON.parse(token) });
    }
    // console.log(state)
  }, []);
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
