// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const { validateActionId } = require('./actions-middlware')

const router = express.Router()

// [GET] all actions
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

// [GET] a action by id
router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

// [POST] a new action
router.post('/', (req, res, next) => {
    const { notes, description, project_id } = req.body
    Actions.insert(req.body)
        .then(newAction => {
            if (!notes || !description || !project_id) {
                res.status(400).json({
                    message: "AHAFJF"
                })
            } else {
                res.json(newAction)
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message,
                custom: "IJFOIHGF"
            })
        })
})

// [PUT] change a action
router.put('/:id', (req, res, next) => {

})

// [DELETE] a action by id
router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: "Very bad things happened",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router

