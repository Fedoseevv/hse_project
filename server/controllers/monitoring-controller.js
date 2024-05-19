const ApiError = require('../handlers/api-error');
const monitoringQueries = require('../dbQueries/monitoring-queries');

class MonitoringController {
    async addRecord(req, res, next) {
        try {

            const [ device_id, pulseMain, pulseLow, stepCntBefore, stepCntAfter,
                activeTimeBefore, activeTimeAfter, aox, aoy, aoz, longitude, latitude ] = req.body.test.split(";")
            if (req.body.isEmpty) {
                return next(ApiError.badReq("Тело запроса пустое!"));
            }

            const pulse = `${pulseMain}.${pulseLow}`
            const steps = parseInt(stepCntBefore) * 100 + parseInt(stepCntAfter)
            const activeTime = parseInt(activeTimeBefore) * 100 + parseInt(activeTimeAfter)

            monitoringQueries.addRecord(device_id, pulse, longitude, latitude, aox, aoy, aoz, steps, activeTime)
                .then(response => {
                    return res.status(201).json({message: response});
                })
                .catch(resp => {
                    console.log(resp)
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
            const { id } = req.params;
            await monitoringQueries.getLast3S(id)
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
            const id = req.params.id;
            await monitoringQueries.lastPosition(id)
                .then(response => {
                    return res.status(200).send(response);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async allPositions(req, res, next) {
        try {
            const id = req.params.id;
            await monitoringQueries.allPositionsBySession(id)
                .then(response => {
                    console.log(response)
                    const result = response.map(item => {
                        return {
                            number: item.number,
                            position: [ item.longitude, item.latitude ]
                        }
                    })
                    return res.status(200).send(result);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}


module.exports = new MonitoringController();