import { Router } from "express";
import utilsRoutes from "./utils.apiRoutes.js";
import iplistRoutes from "./iplist.apiRoutes.js";
import beamAngleRoutes from "./beamAngle.apiRoutes.js";
import reflectorTypeRoutes from "./reflectorType.apiRoutes.js";
import mountingListRoutes from "./mountingList.apiRoutes.js";
import dimmingListRoutes from "./dimmingList.apiRoutes.js";
import ccListRoutes from "./ccList.apiRoutes.js";
import brandRoutes from "./brand.apiRoutes.js";
import groupRoutes from "./group.apiRoutes.js";
import serisRoutes from "./seris.apiRoutes.js";
import subSerisRoutes from "./subSeris.apiRoutes.js";
import productSpecificationRoutes from "./productSpecification.apiRoutes.js";

const router = Router();
router.use(process.env.CONPANY_NAME_ROUTE, utilsRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, iplistRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, beamAngleRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, reflectorTypeRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, mountingListRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, dimmingListRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, ccListRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, brandRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, groupRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, serisRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, subSerisRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, productSpecificationRoutes);
router.use(process.env.CONPANY_NAME_ROUTE, productRoute);

export default router;
