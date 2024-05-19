"use client"
import { RecipesProvider, useRecipes } from '@/context/RecipesContext';
import NewPost from '../../components/NewPost';
export default function NewPostPage(){
    return (
     <RecipesProvider>
        <NewPost/>
    </RecipesProvider>
        )
}