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
  | { type: 'CHANGE_INSTRUCTION'; payload:StepType[]}
  | {type: 'CHANGE_STEP'; payload: {id: number; content: StepType}}
  | { type: 'CHANGE_COVER'; payload: string|Blob|null};

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
    case 'CHANGE_STEP':
    const {id, content } = action.payload;

    // Check if the index is within the range of the instructions array
    if (id >= 0 && id < state.instructions.length) {
      // Create a copy of the instructions array
      const updatedInstructions = [...state.instructions];
      // Update the content of the instruction at the specified index
      updatedInstructions[id] = content;
      // Return the updated state with the new instructions array
      return { ...state, instructions: updatedInstructions };
    } 
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
