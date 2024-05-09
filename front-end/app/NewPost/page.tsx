"use client"
import { RecipesProvider, useRecipes } from '@/context/RecipesContext';
import NewPost from './NewPost';
export default function page(){
    return (
     <RecipesProvider>
        <NewPost/>
    </RecipesProvider>
        )
}