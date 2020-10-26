var express = require('express');
var router = express.Router();

//index controller
let indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home',  indexController.displayHomePage);

/* GET home page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET home page. */
router.get('/services', indexController.displayServicesPage);

/* GET home page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for DISPLAYING Login Page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login Page */
router.post('/login', indexController.processLoginPage);

/* GET Route for DISPLAYING Register Page */
// router.get('/register', indexController.displayRegisterPage);

// /* POST Route for processing the Register Page */
// router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
