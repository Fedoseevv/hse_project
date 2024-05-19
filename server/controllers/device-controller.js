const ApiError = require('../handlers/api-error');
const deviceQueries = require('../dbQueries/device-queries');
const {uuid} = require("uuidv4");

class DeviceController {
    async getAll(req, res) {
        try {
            await deviceQueries.allDevices()
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
            await deviceQueries.deviceById(id)
                .then(resp => {
                    return res.status(200).send(resp);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async addDevice(req, res) {
        try {
            const {alias, id} = req.body;
            // const id = uuid()
            await deviceQueries.addDevice(id, alias || "имя не указано")
                .then(resp => {
                    return res.status(201).json({message: resp})
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async updateDevice(req, res) {
        try {
            const {device_id, alias} = req.body;
            await deviceQueries.updateDevice(device_id, alias)
                .then(resp => {
                    return res.status(201).json({message: resp})
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async deleteDevice(req, res) {
        try {
            const {id} = req.params;
            await deviceQueries.deleteDevice(id)
                .then(resp => {
                    return res.status(201).json({message: resp})
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new DeviceController();