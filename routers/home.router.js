const { Router } = require("express");
const { addUsuarios } = require("../controllers/home.controller");

const router = Router();

router.post('/', addUsuarios);

module.exports = router