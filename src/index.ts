import express from "express"
import jwt from "jsonwebtoken"
import { UserModel } from "./db";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    const {userName, password} = req.body;

    await UserModel.create({
        userName,
        password
    })

    res.json({
        msg: "You're signed up"
    })
})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/signup", (req, res) => {

})

app.delete("/api/v1/signup", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.post("/api/v1/brain/:sharelink", (req, res) => {

})