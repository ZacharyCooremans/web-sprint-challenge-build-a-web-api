// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const { validateProjectId } = require('./projects-middleware')

const router = express.Router()

// [GET] all projects
router.get('/', (req, res, next) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})

// [GET] a project with id
router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

// [POST] a new project
router.post('/', (req, res, next) => {

})

// [PUT] update a project with id
router.put('/:id', (req, res, next) => {

})

// [DELETE] a project with id
router.delete('/:id', (req, res, next) => {

})

// [GET] actions with project id
router.get('/:id/actions', (req, res, next) => {

})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: "Very bad things happened",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
