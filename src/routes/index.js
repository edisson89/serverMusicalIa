const { Router } = require("express");
const router = Router();
const addNota = require("../handlers/addNota");

router.post("addnota",addNota);

module.exports = router;
