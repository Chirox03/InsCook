import StepType from "./StepType";

export default interface RecipeType{
    id: string|null;
    title: string;
    image: Blob|null|string;
    likes:number;
    comments:number;
    description: string;
    duration: number;
    category:string;
    pax: number;
    ingredients: Array<string>;
    instructions: Array<StepType>;
    user_id:string;
}