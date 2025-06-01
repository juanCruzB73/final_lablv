import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import categoryRoute from './routes/categoriaRoute.ts';
import descuentoRoute from './routes/descuentoRoute.ts';
import productRoute from './routes/productRoute.ts';
import sucursalRoute from './routes/sucursalRoute.ts';
import provinciaRoute from './routes/provinciaRoute.ts';
import localidadRoute from './routes/localidadRoute.ts';
import direccionRoute from './routes/direccionRoute.ts';
import stockRoute from './routes/stockRoute.ts';

dotenv.config();

const app=express();
app.use(express.json());

app.use("/users",userRouter)
app.use("/categoria",categoryRoute)
app.use("/descuento",descuentoRoute)
app.use("/producto",productRoute)
app.use("/sucursal",sucursalRoute)
app.use("/provincia",provinciaRoute)
app.use("/localidad",localidadRoute)
app.use("/direccion",direccionRoute)
app.use("/stock",stockRoute)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});