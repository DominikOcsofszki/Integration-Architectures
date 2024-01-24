import { Router } from "express";

import { checkAuthorization } from "../middleware/auth-middleware";
import hrRouter from "./hr";
import ceoRouter from "./ceo";
import salesmanRouter from "./salesman";
import adminRouter from "./admin";
import baseRouter from "./user";

const router = Router();

router.use("", baseRouter);

// router.use("/hr",checkAuthorization(["hr"]), hrRouter);
router.use("/hr", hrRouter); //TODO!!!!

// router.use("/ceo", checkAuthorization(["ceo"]), ceoRouter);
router.use("/ceo",  ceoRouter);

// router.use("/salesman", checkAuthorization(["salesman"]), salesmanRouter);
router.use("/salesman",  salesmanRouter);

// router.use("/admin", checkAuthorization(["admin"]), adminRouter);
router.use("/admin",  adminRouter);

export default router;
