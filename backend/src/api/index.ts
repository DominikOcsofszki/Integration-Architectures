import { Router } from "express";

import { checkAuthorization } from "../middleware/auth-middleware";
import hrRouter from "./hr";
import ceoRouter from "./ceo";
import salesmanRouter from "./salesman";
import adminRouter from "./admin";
import baseRouter from "./user/index.ts";

const router = Router();

router.use("", baseRouter);

router.use("/hr", checkAuthorization(["hr"]), hrRouter);

router.use("/ceo", checkAuthorization(["ceo"]), ceoRouter);

router.use("/salesman", checkAuthorization(["salesman"]), salesmanRouter);

router.use("/admin", checkAuthorization(["admin"]), adminRouter);

export default router;
