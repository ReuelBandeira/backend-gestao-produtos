import { container } from 'tsyringe';
import '@modules/employee/providers';

import ICategoryRepository from '@modules/categorys/repositories/ICategoryRepository';
import CategoryRepository from '@modules/categorys/infra/typeorm/repositories/CategoryRepository';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IEmployeesRepository from '@modules/employee/repositories/IEmployeeRepository';
import EmployeesRepository from '@modules/employee/infra/typeorm/repositories/EmployeeRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<IEmployeesRepository>(
  'EmployeeRepository',
  EmployeesRepository
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);
