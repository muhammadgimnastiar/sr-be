import { Router } from "express";
import { tokenValidation } from "../lib/tokenHandler.js";
import { getEvent, createEvent, updateEvent } from "../controller/event.controller.js";
import { getBlog, createBlog, updateBlog, deleteBlog } from "../controller/blog.controller.js";
import { authController } from "../controller/auth.controller.js";
import { createExchangeTransaction, getExchangeTransactions, getExchangeTransactionsByUserId, deleteExchangeTransaction } from "../controller/exchange.controller.js";
import { createReport, getReport } from "../controller/report.controller.js";
import { getUser, postPointByUserId, changeUserRole, getAllUsers } from "../controller/user.controller.js";
import { getPaymentHistory, createPaymentMethod } from "../controller/payment.controller.js";
import { getTransactionHistory, createTransactionPayment } from "../controller/transaction.controller.js";
import { getItems, createItem, getItemsById, updateItems, postPointByItemId, postTotalByItemId } from "../controller/item.controller.js";



const router = Router({ strict: true });

// Public routes (no token required)
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

// Protected routes (require token)
router.get("/events", tokenValidation(), getEvent);
router.post("/events", tokenValidation(), createEvent);
router.put("/events/:id", tokenValidation(), updateEvent);

router.get("/blogs", tokenValidation(), getBlog);
router.post("/blogs", tokenValidation(), createBlog);
router.put("/blogs/:id", tokenValidation(), updateBlog);
router.delete("/blogs/:id", deleteBlog);

router.get("/exchange", tokenValidation(), getExchangeTransactions);
router.post("/exchange", tokenValidation(), createExchangeTransaction);
router.get("/exchange/:user_id", tokenValidation(), getExchangeTransactionsByUserId);
router.delete("/exchange/:exchangeId", tokenValidation(), deleteExchangeTransaction);

router.get("/report", tokenValidation(), getReport);
router.post("/report", tokenValidation(), createReport);

router.get("/items", tokenValidation(), getItems);
router.post("/items", tokenValidation(), createItem);
router.get("/items/:id", tokenValidation(), getItemsById);
router.put("/items/:id", tokenValidation(), updateItems);
router.post("/items/:id", tokenValidation(), postPointByItemId);

router.get("/user", tokenValidation(), getUser);
router.post("/user/points", tokenValidation(), postPointByUserId);
router.post("/user/change-role", tokenValidation(), changeUserRole);
router.get("/users", tokenValidation(), getAllUsers);

router.get("/payment-history/:user_id", tokenValidation(), getPaymentHistory);
router.get("/transaction-history/:user_id", tokenValidation(), getTransactionHistory);
router.post("/payment-method", tokenValidation(), createPaymentMethod);
router.post("/transaction-payment", tokenValidation(), createTransactionPayment);



export default router;
