// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            next({
                status: 404,
                message: 'project not found at all'
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "project not found for some reason"
        })
    }
}

async function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({
            message: "Missing required fields."
        })
    } else {
        next()
    }
}


module.exports = {
    validateProjectId,
    validateProject,
}