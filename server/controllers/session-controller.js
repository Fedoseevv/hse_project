const ApiError = require('../handlers/api-error');
const sessionQueries = require("../dbQueries/session-queries");

class SessionController {
    async getAll(req, res) {
        try {
            await sessionQueries.allSessions()
                .then(resp => {
                    return res.status(200).send(resp);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async getById(req, res) {
        try {
            const {id} = req.params;
            await sessionQueries.sessionById(id)
                .then(resp => {
                    return res.status(200).send(resp);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async startSession(req, res) {
        try {
            const {sessionId, sessionName, binds} = req.body;
            await sessionQueries.startSession(sessionId, sessionName)
            for (const item of binds) {
                await sessionQueries.bindDeviceAndPerson(sessionId, item.userId, item.deviceId)
            }
            return res.status(201).json({message: "Сессия начата!"});
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async closeSession(req, res) {
        try {
            const {id} = req.params;
            await sessionQueries.closeSession(id)
                .then(resp => {
                    return res.status(200).send(resp);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new SessionController()