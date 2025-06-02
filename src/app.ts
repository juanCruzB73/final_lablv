import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute';
import categoryRoute from './routes/categoriaRoute';
import descuentoRoute from './routes/descuentoRoute';
import productRoute from './routes/productRoute';
import sucursalRoute from './routes/sucursalRoute';
import provinciaRoute from './routes/provinciaRoute';
import localidadRoute from './routes/localidadRoute';
import direccionRoute from './routes/direccionRoute';
import stockRoute from './routes/stockRoute';
import pedidoRoute from './routes/pedidoRoute';
import facturaRoute from './routes/facturaRoute';
import detallePedidoRoute from './routes/detallePedidoRoute';
import { jwtMiddleware } from './middleware/auth';

dotenv.config();

const app=express();
app.use(express.json());

app.use("/users",userRouter)
app.use(jwtMiddleware);

app.use("/categoria",categoryRoute)
app.use("/descuento",descuentoRoute)
app.use("/producto",productRoute)
app.use("/sucursal",sucursalRoute)
app.use("/provincia",provinciaRoute)
app.use("/localidad",localidadRoute)
app.use("/direccion",direccionRoute)
app.use("/stock",stockRoute)
app.use("/pedido",pedidoRoute)
app.use("/factura",facturaRoute)
app.use("/detallePedido",detallePedidoRoute)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});