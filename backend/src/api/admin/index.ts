import { Router } from "express";

import { createSalesman, readSalesman, updateSalesman, deleteSalesman } from "./salesman-crud-api";
import { createBonusComputationSheet, readBonusComputationSheet, updateBonusComputationSheet, deleteBonusComputationSheet } from "./bonus-sheet-crud-api";
import { createSalesmanUser } from "./test-creation-api";

const router = Router();

router.post('/salesman', createSalesman)
router.get('/salesman/:id', readSalesman)
router.put('/salesman/:id', updateSalesman)
router.delete('/salesman/:id', deleteSalesman)

router.post("/sheet", createBonusComputationSheet);
router.get("/sheet/:salesmanId/:yearOfEvaluation", readBonusComputationSheet);
router.put("/sheet/:salesmanId/:yearOfEvaluation", updateBonusComputationSheet);
router.delete("/sheet/:salesmanId/:yearOfEvaluation", deleteBonusComputationSheet);

router.post("/createUser/Otto", createSalesmanUser);

export default router;