import express from "express";
import { authenticateAdmin } from "../../middleware/Authentication.js";
import AdminController from '../../controllers/admin/AdminController.js'
import FeaturesController from "../../controllers/admin/FeaturesController.js";
export const adminRouter = express.Router();


adminRouter.get('/admin/verify-page',AdminController.verifyPage)
adminRouter.post('/admin/login', AdminController.login)
adminRouter.get('/admin/logout', authenticateAdmin, AdminController.logout)
adminRouter.get('/admin/me',authenticateAdmin, AdminController.profile)
adminRouter.post("/admin/category/new",authenticateAdmin,FeaturesController.createCategory)
adminRouter.get("/admin/categories",authenticateAdmin,FeaturesController.getAllCategories)
adminRouter.get("/admin/categories-name",FeaturesController.getAllCategoriesName)
adminRouter.get("/admin/fields-name/:category",FeaturesController.getFieldsACToCategory)

adminRouter.route("/admin/category/:id").get(authenticateAdmin,FeaturesController.getSingleCategory).delete(authenticateAdmin,FeaturesController.deleteCategory).put(authenticateAdmin,FeaturesController.updateCategory)

