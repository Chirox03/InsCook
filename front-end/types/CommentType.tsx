export default interface CommentType{
    id: string;
    user:{
        userID: string;
        username: string;
        avatar: string;
    }
    timestamp: Date;
    content: string;
}