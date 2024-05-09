
export default interface PostType{
    id: string;
    user:{
        userID: string;
        username: string;
        avatar: string;
    }
    image:string|null;
    timestamp: Date;
    title: string;
    caption:string;
    likes: number;
    comments: number;
    isSaved: boolean;
    isLiked:boolean
}