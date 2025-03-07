import express, { Router } from 'express';
import * as DepController from './../controllers/departments.controller';

const router: Router = express.Router();

router.get('/', DepController.getAllDepartments);
router.get('/:id', DepController.getDepartmentById);
router.post('/', DepController.createDepartment);
router.put('/:id', DepController.updateDepartment);
router.delete('/:id', DepController.deleteDepartment);

export default router;
