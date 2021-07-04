import { Schema } from 'mongoose'


export const ArticleSchema = new Schema({
    //name: {type:String, required: true},
    title: String,
    storyTitle: String,
    author: String,
    createdAt:{
        type: Date,
        default: Date.now
    }

});