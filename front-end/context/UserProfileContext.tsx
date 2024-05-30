import React, { createContext, useContext, useReducer, ReactNode } from 'react';
interface APiUser{
    id:string;
    name: string;
    biography: string;
    avatar:string;
  
  }
  interface AppUserProfile{
    userID: string;
    name: string;
    avatar:any;
    description: string;
  }
type Action = 
{type:'CHANGE_USERNAME',payload:string}|
{type:'CHANGE_BIO',payload:string}|
{type:'CHANGE_AVATAR',payload:File}|
{type:'SET',payload:AppUserProfile}

const userProfileReducer = (state: AppUserProfile, action: Action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'CHANGE_BIO':
      return {
        ...state,
        description: action.payload,
      };
    case 'CHANGE_AVATAR':
      return {
        ...state,
        avatar: action.payload,
      };
    case 'SET':
        return action.payload
    default:
      return state;
  }
};
const UserProfileContext = createContext<{ state: AppUserProfile; dispatch: React.Dispatch<Action> } | undefined>(undefined);
export const UserProfileProvider :React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userProfileReducer, {
    userID:'',
    name: '',
    avatar: null,
    description: '',
  } as AppUserProfile);

  return (
    <UserProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile= () => {
    const context = useContext(UserProfileContext);
    if (!context) {
      throw new Error('useUserProfile must be used within a RecipesProvider');
    }
    return context;
  };
