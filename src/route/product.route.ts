import { Router } from 'express';
import ProductController from '../controller/product.controller';

const productRoute = Router();

productRoute.get('/', ProductController.getAll);
productRoute.get(
  '/calculate/:productId/:landSize',
  ProductController.calculate,
);
productRoute.post('/:id', ProductController.get);
productRoute.patch('/:id', ProductController.update);
productRoute.delete('/:id');

export default productRoute;
