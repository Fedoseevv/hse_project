const ApiError = require('../handlers/api-error');
const personQueries = require('../dbQueries/players-queries');
const { uuid } = require('uuidv4');

class PlayersController {
    async addRecord(req, res, next) {
        try {
            const user_id = uuid()
            const {surname, name, weight, height, position, age, number} = req.body;
            console.log(user_id, surname, name, weight, height, position, age, number);
            await personQueries.addRecord(user_id, surname, name, weight, height, position, age, number)
                    .then(resp => {
                        return res.status(201).json({ message: resp });
                    })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async updateRecord(req, res, next) {
        try {
            const {user_id, surname, name, weight, height, position, age, number} = req.body;
            console.log(user_id, surname, name, weight, height, position, age);
            await personQueries.updateRecord(user_id, surname, name, weight, height, position, age, number)
                .then(response => {
                    return res.status(200).json({ message: response });
                })

        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async allRecords(req, res, next) {
        try {
            await personQueries.allRecords()
                    .then(response => {
                        return res.status(200).send(response);
                    })
        } catch (e) {
            return res.status(400).json({message: e.message});
        } 
    }

    async deleteRecord(req, res, next) {
        try {
            const id = req.params.id;
            await personQueries.deleteRecordById(id)
                        .then(resp => {
                            return res.status(201).json({ message: resp });
                        })
        } catch (e) {
            return res.status(400).json({message: e.message});
        } 
    }

    async getPersonById(req, res, next) {
        try {
            const id = req.params.id;
            await personQueries.getById(id)
                        .then(resp => {
                            return res.status(200).send(resp);
                        })
        } catch (e) {
            return res.status(400).json({message: e.message});
        } 
    }
}

module.exports = new PlayersController();