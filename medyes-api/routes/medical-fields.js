const logic = require('../logic');
const express = require('express');
const router = express.Router();
const handleErrors = require('../middleware/handle-errors')
const auth= require('../middleware/auth')


router.get('/', auth, (req, res) => {

    handleErrors(async () => {
        const fields = await logic.getAllfields()

        res.json(fields)
    }, res)
})

router.get('/:id', auth, async (req, res) => { // TODO required? otherwise remove

    handleErrors(async () => {

        const { params: { id } } = req

        const field = await logic.getOnefield(id)

        res.json(field)
    }, res)
})

router.post('/', auth, async (req, res) => {
    handleErrors(async () => {

        const { userId, body: { name } } = req

        const result = await logic.createMedicalField(userId, name)
        res.json(result)
    }, res)
})

module.exports = router;
