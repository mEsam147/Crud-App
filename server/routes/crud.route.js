import express from "express";
import { createCrudData, deleteCrudData, GetAllCrudData, getCrudDataById, updateCrudData } from "../controllers/crud.controller.js";

const router = express.Router();
router.get('/', GetAllCrudData)
router.get("/:id", getCrudDataById);
router.post("/", createCrudData);
router.put("/:id", updateCrudData);
router.delete("/:id", deleteCrudData);



export default router;
