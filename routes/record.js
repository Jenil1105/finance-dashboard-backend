const express = require("express");
const { getRecords } = require("../controllers/record/getRecords");
const { createRecord } = require("../controllers/record/createRecord");
const { checkRoleAccess } = require("../middlewares/checkRoleAccess");
const router = express.Router();

router.get('/', getRecords);
router.post('/', checkRoleAccess('operator','admin'), createRecord);

module.exports = router;