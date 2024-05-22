'use client';
import { RecipesProvider } from '@/context/RecipesContext';
import NewPost from '../../components/NewPost';
export default function NewPostPage(){
  return (
    <RecipesProvider>
      <NewPost/>
    </RecipesProvider>
  );
}