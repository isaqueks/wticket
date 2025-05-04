import express from "express";
import * as WhmcsController from "../controllers/WhmcsController"

const whmcsRoutes = express.Router();

whmcsRoutes.post("/whmcs/create", WhmcsController.create);
whmcsRoutes.post("/whmcs/suspend", WhmcsController.suspend);
whmcsRoutes.post("/whmcs/unsuspend", WhmcsController.unsuspend);
whmcsRoutes.post("/whmcs/terminate", WhmcsController.suspend);

export default whmcsRoutes;
