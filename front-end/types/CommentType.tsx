export default interface CommentType{
    id: string;
    user:{
        userID: string;
        username: string;
    }
    timestamp: Date;
    content: string;
    reply: Array<CommentType>
}