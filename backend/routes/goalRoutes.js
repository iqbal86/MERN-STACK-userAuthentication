const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updatetGoal, deleteGoal } = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updatetGoal).delete(deleteGoal)

module.exports = router