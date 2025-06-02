import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import dotenv from 'dotenv';
import { ACCCESS_TOKEN } from "../config/config";
import { Request, Response } from "express";
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types";
import { Direccion, Localidad, Pedido, User } from "../models/models";
dotenv.config();

const client = new MercadoPagoConfig({
    accessToken:ACCCESS_TOKEN,
    options:{
        timeout:5000,
    }
});

const payment=new Payment(client);
export const createOrder=async(req:Request,res:Response)=>{
    try{
        const { userId,adressId,pedidoId } = req.params;
        if (!userId) {
             res.status(400).json({ message: "user not found" });
        }
        if (!adressId) {
             res.status(400).json({ message: "adress not found" });
        }
        const user=await User.findFirst({where:{usuario_id:Number(userId)}});
        const adress=await Direccion.findFirst({where:{direccion_id:Number(adressId)}});
        const localidad=await Localidad.findFirst({where:{localidad_id:Number(adress?.localidad_id)}});
        const payer:PayerRequest={
            email:user?.email ?? "",
            address:{
                street_name:adress?.calle??"",
                street_number:adress?.numero??"",
                city:localidad?.nombre??""
            },
        }
        const pedido=await Pedido.findFirst({where:{pedido_id:Number(pedidoId)}});
        const itemToSale=[]
        const preference = new Preference(client);
        //await preference.create({
            //body:{payer}
        //})
    }catch(err){
        console.log(err);
    }
}