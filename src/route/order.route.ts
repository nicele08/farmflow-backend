import { Router } from 'express';
import OrderController from '../controller/order.controller';

const orderRoute = Router();

orderRoute.get('/', OrderController.getAll);
orderRoute.post('/:id', OrderController.get);
orderRoute.patch('/:id', OrderController.update);
orderRoute.delete('/:id');

export default orderRoute;
