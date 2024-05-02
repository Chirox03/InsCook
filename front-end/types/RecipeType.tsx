import StepType from "./StepType";

export default interface RecipeType{
    id: number;
    title: string;
    image: Blob|null|string;
    description: string;
    duration: number;
    pax: number;
    ingredients: Array<string>;
    instructions: Array<StepType>
}