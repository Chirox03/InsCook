
export default interface PostType{
    id: string;
    user:{
        userID: string;
        username: string;
    }
    timestamp: Date;
    title: string;
    caption:string;
    likes: number;
    isSaved: boolean;
    isLiked:boolean
}