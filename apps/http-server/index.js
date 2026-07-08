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

app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
})