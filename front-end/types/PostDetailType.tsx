export default interface PostDetailType{
    id: number;
    tittle: string;
    description: string;
    duration: number;
    pax: number;
    ingredient: Array<string>;
    instructions: Array<{
      step: number;
      content: string;
      isDeleted: boolean;
  
}
}