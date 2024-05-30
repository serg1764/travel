import { Schema } from 'mongoose';

export const ArticleSchema = new Schema(
  {
    title: { type: String, required: false },
    url: { type: String, unique: true, sparse: true },
    description: { type: String, required: false },
    h1: { type: String, required: false },
    text1: { type: String, required: false },
    text2: { type: String, required: false },
    text3: { type: String, required: false },
    picture: { type: String, required: false },
  },
  { timestamps: true },
); // Добавляем опцию timestamps: true
