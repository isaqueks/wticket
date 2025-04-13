import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/whmcs/order", (req, res) => {
  console.log(req.body);

  res.json({
    status: "success",
    message: "Order received",
  });
});

export default orderRouter;
