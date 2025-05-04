import express from "express";
import * as WhmcsController from "../controllers/WhmcsController"

const whmcsRoutes = express.Router();

whmcsRoutes.get("/whmcs/create", WhmcsController.create);
whmcsRoutes.get("/whmcs/suspend", WhmcsController.suspend);
whmcsRoutes.get("/whmcs/unsuspend", WhmcsController.unsuspend);
whmcsRoutes.get("/whmcs/terminate", WhmcsController.suspend);

export default whmcsRoutes;
