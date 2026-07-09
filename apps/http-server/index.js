import express from "express";
import cors from "cors";
import { prisma } from "@repo/db";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.post("/create",async(req,res)=>{
    const {username , password} = req.body;
    try{
    const newuser = await prisma.user.create({ data: { username, password } });
    return res.status(200).json({message:"user created succesfully"});

    }catch(error){
        return res.status(400).json("Error in creating user");
    }
})

app.get("/user", async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ message: "username query param is required" });
    }
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user" });
    }
});

app.delete("/user", async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ message: "username query param is required" });
    }
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await prisma.user.delete({ where: { username } });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user" });
    }
});

app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
})