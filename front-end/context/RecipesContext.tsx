import RecipeType from '@/types/RecipeType';
import StepType from '@/types/StepType';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Action =
  | { type: 'TITTLE'; payload: string }
  | { type: 'DESCRIPTION'; payload: string }
  | { type: 'PAX'; payload: number }
  | { type: 'DURATION'; payload: number }
  | { type: 'ADD_INGRE'; payload: string }
  | { type: 'DEL_INGRE'; payload: number }
  | { type: 'ADD_STEP'; payload: StepType }
  | { type: 'DEL_STEP'; payload: number }
  | { type: 'CHANGE_INGRE'; payload:string[]}
  | { type: 'CHANGE_COVER'; payload: string|ArrayBuffer|null};

const initialState: RecipeType = {
  id: 1,
  image: null,
  title: '',
  description: '',
  pax: 0,
  duration: 0,
  ingredients: [],
  instructions: [],
};

const reducer = (state: RecipeType, action: Action): RecipeType => {
  switch (action.type) {
    case 'TITTLE':
      console.log("tittle change")
      return { ...state, title: action.payload };
    case 'DESCRIPTION':
      return { ...state, description: action.payload };
    case 'PAX':
      return { ...state, pax: action.payload };
    case 'DURATION':
      return { ...state, duration: action.payload };
    case 'ADD_INGRE':
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case 'CHANGE_INGRE':
      return { ...state, ingredients: action.payload };
    case 'DEL_INGRE':
      return { ...state, ingredients: state.ingredients.filter((_, index) => index !== action.payload) };
    case 'ADD_STEP':
      return { ...state, instructions: [...state.instructions, action.payload] };
    case 'DEL_STEP':
      return { ...state, instructions: state.instructions.filter((_, index) => index !== action.payload) };
    case 'CHANGE_COVER':
      return { ...state, image:action.payload };
    default:
      return state;
  }
};

const RecipesContext = createContext<{ state: RecipeType; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
};
