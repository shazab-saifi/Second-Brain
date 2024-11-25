import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { ContentModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { Request, Response } from "express"

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    const { userName, password } = req.body;
    try {
        await UserModel.create({
            userName,
            password
        })

        res.json({
            msg: "You're signed up"
        })
    } catch (error) {
        res.status(411).json({
            msg: "User already exists!"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const { userName, password } = req.body;

    const doesUserExists = await UserModel.findOne({
        userName,
        password
    });

    if (doesUserExists) {
        const token = jwt.sign({
            id: doesUserExists._id
        }, JWT_SECRET);

        res.json({ token: token });
    } else {
        res.status(403).json({
            msg: "Incorrect credentials!"
        })
    }
});

app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    const { type, link, title } = req.body;
    try {
        await ContentModel.create({
            type,
            link,
            userId: req.userId,
            title
        })

        res.json({
            msg: "Content created"
        })
    } catch (error) {
        res.status(500).json({
            msg: `Internal server: ${error}`
        })
    }
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const content = await ContentModel.find({ userId }).populate("userId", "userName");

        if (content.length == 0) {
            res.status(404).json({
                msg: "No content!"
            });
        } else {
            res.json({content});
        }

    } catch (error) {
        console.error("Internal server error: " + error);
        res.status(500).json({
            err: `Internal server ${error}`
        });
    }
})

app.delete("/api/v1/content", async (req, res) => {
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteOne({
            contentId
        })

        res.json({
            msg: "Content deleted successfully!"
        })
        
    } catch (error) {
        console.error("Internal server error: " + error);
        res.status(500).json({
            err: `Internal server ${error}`
        });
    }
})

app.post("/api/v1/brain/share", (req, res) => {

})

app.post("/api/v1/brain/:sharelink", (req, res) => {

})

app.listen(3000)