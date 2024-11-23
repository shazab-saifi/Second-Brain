import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://shazebsaifi92:myfirstcluster@cluster0.z1exw.mongodb.net/secondBrain");

const UserSchema = new Schema({
    userName: {type: String, unique: true, require: true},
    password: {type: String, unique: true, require: true}
});

export const UserModel = model("Users", UserSchema);