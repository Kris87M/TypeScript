import express from 'express'
import cors from 'cors'
import departmentsRoutes from './routes/departments.routes'
import employeesRoutes from './routes/employees.routes'
import productsRoutes from './routes/products.routes'
import { Router } from 'express'

interface Route {
  path: string;
  routes: Router;
}

class App {
  private app: express.Application;
  private routes: Route[] = [];
  private server: any;

  constructor() {
    this.app = express();
  }

  public addRoutes(path: string, routes: Router): void {
    this.routes.push({ path, routes });
  }

  private prepareRoutes(): void {
    for(const group of this.routes) {
      this.app.use(group.path, group.routes);
    }
  }

  public run(port: number): void {

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.get('/', (req, res) => {
      res.send('API is running. Use /departments, /employees, or /products.');
    });

    this.prepareRoutes();

    this.server = this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }

}

const app = new App();
app.addRoutes('/departments', departmentsRoutes);
app.addRoutes('/employees', employeesRoutes);
app.addRoutes('/products', productsRoutes);
app.run(3000);

