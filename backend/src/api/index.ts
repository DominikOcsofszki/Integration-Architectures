import { Router } from "express";

import hrRouter from "./hr";
import ceoRouter from "./ceo";
import salesmanRouter from "./salesman";
import adminRouter from "./admin";
import baseRouter from "./user";

const router = Router();

router.use("", baseRouter);

router.use("/hr", hrRouter);

router.use("/ceo",  ceoRouter);

router.use("/salesman",  salesmanRouter);

router.use("/admin",  adminRouter);

export default router;
