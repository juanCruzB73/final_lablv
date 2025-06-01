import { Request, Response } from "express";
import { User } from "../models/models.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers=async(req:Request,res:Response)=>{
    try{
        const users=await User.findMany();
        const usersSanitized = users.map(({ id, ...rest }) => ({
            id: id.toString(), // BigInt a string
            ...rest,
        }));
         res.status(200).json({ok:true,users:usersSanitized});
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
        const user=await User.findFirst({where:{id:Number(userId)}});
        const userSanitized = {...user,id:user?.id.toString()}
        res.status(200).json({ok:true,user:userSanitized});
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
        const safeUser = {
            ...userWithoutPassword,
            id: newUser.id.toString(),
        };
        res.status(201).json({ ok: true, user: safeUser });
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
        const safeUser = {
            ...user,
            id: user.id.toString(),
        };
        res.status(201).json({ ok: true, user: safeUser });
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

    const existingUser = await User.findUnique({ where: { id: Number(userId) } });

    if (!existingUser) {
        res.status(404).json({ message: "user not found" });
        return;
    }

    await User.delete({
      where: { id: Number(userId) },
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

        const payload = { id: existingUser.id.toString(), email: existingUser.email };
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined in environment");
        }
        const secret = process.env.JWT_SECRET || process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        const { password: _, ...userData } = existingUser;
        const safeUserData = {
            ...userData,
            id: existingUser.id.toString(), 
        };

        res.status(200).json({ token, user: safeUserData });
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};