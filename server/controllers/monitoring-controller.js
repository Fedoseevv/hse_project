const ApiError = require('../handlers/api-error');
const monitoringQueries = require('../dbQueries/monitoring-queries');

class MonitoringController {
    async addRecord(req, res, next) {
        try {
            const [ latitude, longitude, coordX, coordY, coordZ, heartBit ] = req.body.test.split(";")
            console.log(latitude, longitude, coordX, coordY, coordZ, heartBit)

            if (req.body.isEmpty) {
                return next(ApiError.badReq("Тело запроса пустое!"));
            }

            const currTimestamp = Date.now()
            if (latitude == undefined || longitude == undefined || coordX == undefined || coordY == undefined || coordZ == undefined || heartBit == undefined) {
                return res.status(400).json({message: "Not valid data"})
            }

            monitoringQueries.addRecord(latitude, longitude, coordX, coordY, coordZ, heartBit, currTimestamp)
            .then(response => {
                return res.status(201).json({message: response});
            })
            .catch(resp => {
                return res.status(400).json({message: resp});
            })

        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
    async allMonitoring(req, res, next) {
        try {
            await monitoringQueries.getAll()
                .then(response => {
                    return res.status(200).send(response);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
    async monitoringDataById(req, res, next) {
        try {
            const id = req.params.id;
            console.log(`fetch rows more then ${id}`);
            if (id > 10) {
                await monitoringQueries.getGreaterThenId(id)
                    .then(response => {
                        return res.status(200).send(response);
                    })
            } else {
                return res.status(200).send([])
            }
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
    async getMaxId(req, res, next) {
        try {
            await monitoringQueries.getMaxId()
                .then(response => {
                    return res.status(200).send(response[0])
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
    async getDataForLast3S(req, res, next) {
        try {
            await monitoringQueries.getLast3S()
                .then(response => {
                    return res.status(200).send(response)
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
    async getDataByPeriod(req, res, next) {
        try {
            const {startDate, endDate} = req.body;
            console.log(`start date: ${startDate}, end date: ${endDate}`)
            await monitoringQueries.dataByPeriod(startDate, endDate)
                .then(response => {
                    return res.status(200).send(response);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
    async getLastPosition(req, res, next) {
        try {
            await monitoringQueries.lastPosition()
                .then(response => {
                    return res.status(200).send(response);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}


module.exports = new MonitoringController();