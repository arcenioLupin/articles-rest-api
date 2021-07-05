import { Schema } from 'mongoose'


export const ArticleSchema = new Schema({
    title: String,
    storyTitle: String,
    author: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
    storyUrl: String

});