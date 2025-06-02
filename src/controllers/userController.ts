import { Request, Response } from "express";
import { User } from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serializeBigInts } from "../utils/serializeBigInts";

export const getUsers=async(req:Request,res:Response)=>{
    try{
        const users=await User.findMany();
         res.status(200).json({ok:true,users:serializeBigInts(users)});
    }catch(err){
        console.log(err)
         res.status(500).json({message:"error loading users"})
    }
}

export const getUsersById=async(req:Request,res:Response)=>{
    try{
        const { userId } = req.params;
        if (!userId) {
             res.status(400).json({ message: "user not found" });
        }
        const user=await User.findFirst({where:{usuario_id:Number(userId)}});
        res.status(200).json({ok:true,user:serializeBigInts(user)});
    }catch(err){
        console.log(err)
         res.status(500).json({message:"error loading user"})
    }
}

export const registerUser=async(req:Request,res:Response)=>{
    try{
        const { email,password,rol,activo} = req.body;
        if (!email || !password || !rol || !activo) {
             res.status(400).json({ message: "complete los datos" });
        }
        const existingUser = await User.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "User already exist" });
        }
        const saltRounds = 5;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            data: {
                email,
                password: hashedPassword,
                rol,
                activo
            },
        });
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({ ok: true, user: serializeBigInts(newUser) });
    }catch(err){
        console.log(err)
         res.status(500).json({message:"error loading users"})
    }
}

export const updateUser=async(req:Request,res:Response)=>{
    try{
        const { userId } = req.params;
        if (!userId) {
             res.status(400).json({ message: "user not found" });
        }
        const { email,rol,activo} = req.body;
        if (!email || !rol || !activo) {
             res.status(400).json({ message: "complete los datos" });
        }
        const existingUser = await User.findUnique({ where: { email } });
        if (!existingUser) {
            res.status(400).json({ message: "User not found" });
        }
        const user=await User.update({
            where: { email: email },
            data: {
                rol,
                email,
                activo:activo
            },
        })
        
        res.status(201).json({ ok: true, user: serializeBigInts(user) });
    }catch(err){
        console.log(err)
         res.status(500).json({message:"error updating users"})
    }
}

export const delUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
       res.status(400).json({ message: "user not found" });
       return;
    }

    const existingUser = await User.findUnique({ where: { usuario_id: Number(userId) } });

    if (!existingUser) {
        res.status(404).json({ message: "user not found" });
        return;
    }

    await User.delete({
      where: { usuario_id: Number(userId) },
    });

    res.status(200).json({ ok: true, msg: "user deleted" });
    return;
} catch (err) {
    console.log(err);
    res.status(500).json({ message: "error deleting user" });
    return;
}
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password required" });
        return;
    }

    try {
        const existingUser = await User.findUnique({ where: { email } });

        if (!existingUser) {
            res.status(401).json({ message: "Invalid credentials" });
            return;    
        }
        if (!existingUser.password) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isValid = await bcrypt.compare(password, existingUser.password);

        if (!isValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const payload = { id: existingUser.usuario_id.toString(), email: existingUser.email };
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined in environment");
        }
        const secret = process.env.JWT_SECRET || process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        const { password: _, ...userData } = existingUser;
        

        res.status(200).json({ token, user: serializeBigInts(existingUser) });
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};