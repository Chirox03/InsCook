import StepType from "./StepType";

export default interface RecipeType{
    id: number;
    title: string;
    image: string|ArrayBuffer| null;
    description: string;
    duration: number;
    pax: number;
    ingredients: Array<string>;
    instructions: Array<StepType>
}