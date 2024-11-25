import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://shazebsaifi92:myfirstcluster@cluster0.z1exw.mongodb.net/secondBrain");

const UserSchema = new Schema({
    userName: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true}
});

const ContentSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    tags: [{type: mongoose.Types.ObjectId, ref: "Tag"}],
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})

export const ContentModel = model("Content", ContentSchema);
export const UserModel = model("Users", UserSchema);