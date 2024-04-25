import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
    title: String,
    url: String,
});