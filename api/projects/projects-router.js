// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const { validateProjectId, } = require('./projects-middleware')

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
router.post("/", (req, res) => {
    const { name, description } = req.body;
    Project.insert(req.body)
        .then((newProject) => {
            if (!name || !description) {
                res.status(400);
            } else {
                res.json(newProject);
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});

// [PUT] update a project with id
router.put('/:id', validateProjectId, (req, res, next) => {
    const changes = req.body
    Project.update(req.params.id, changes)
        .then(() => {
            return Project.get(req.params.id)
        })
        .then(project => {
            if (!changes) {
                res.status(400).json({
                    message: 'provide the correct stuff my guy'
                })
            } else {
                res.json(project)
            }
        })
        .catch(next)
})

// [DELETE] a project with id
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
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
