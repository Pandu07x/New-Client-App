// server/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user.controller');
const dashboardController = require('../controllers/dashboard.controller');

const router = express.Router();
const cors = require('cors');


const app = express();
app.use(cors());

//For logIn User
router.post('/login', userController.loginUser);

//get Data For Main Dashboard
router.get('/main-dashboard', dashboardController.getMainDashboardData);

//get Data For Main Dashboard
router.get('/plcStatus', dashboardController.getPlcStatusData);
router.get("/testBenchCount",dashboardController.getTestBenchStatusCount)
router.get("/getLast5Bench",dashboardController.Last5BechData)
router.get("/getObjectCount",dashboardController.GetTestObjectCount)
router.get("/testBenchDetails",dashboardController.TestbenchDetails)

module.exports = router;
