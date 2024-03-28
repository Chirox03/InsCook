
export default interface PostType{
    id: string;
    user:{
        userID: string;
        username: string;
    }
    timestamp: Date;
    tittle: string;
    summary:string;
    likes: number;
    isSaved: boolean;
    isLiked:boolean
}