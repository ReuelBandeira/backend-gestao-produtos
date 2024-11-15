import { Router } from 'express';

import employeeRouter from '@modules/employee/infra/http/routes/employees.routes';
import categorysRouter from '@modules/categorys/infra/http/routes/categorys.routes';
import productsRouter from '@modules/products/infra/http/routes/product.routes';
import sessionsRouter from '@modules/employee/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/employee', employeeRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/categorys', categorysRouter);
routes.use('/products', productsRouter);

export default routes;
