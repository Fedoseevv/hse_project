const ApiError = require('../handlers/api-error');
const sessionQueries = require("../dbQueries/session-queries");
const {uuid} = require("uuidv4");

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
            const sessionId = uuid();
            const { sessionName, userDevice } = req.body;
            await sessionQueries.startSession(sessionId, sessionName)
            for (const item of userDevice) {
                await sessionQueries.bindDeviceAndPerson(sessionId, item.user_id, item.device_id)
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
                    return res.status(200).json({message: resp});
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async updateSession(req, res) {
        try {
            const {sessionId, sessionName} = req.body;
            await sessionQueries.updateSession(sessionId, sessionName)
                .then(resp => {
                    return res.status(200).json({message: resp});
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async deleteSession(req, res) {
        try {
            const {id} = req.params;
            await sessionQueries.deleteSessionDevices(id)
            await sessionQueries.deleteSession(id)
                .then(resp => {
                    return res.status(200).json({message: resp});
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async onlineSession(req, res) {
        try {
            const { id } = req.params;
            await sessionQueries.sessionDataById(id)
                .then(response => {
                    return res.status(200).send(response);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async sessionWithDevices(req, res) {
        try {
            const { id } = req.params
            await sessionQueries.sessionWithDevicesById(id)
                .then(response => {
                    return res.status(200).send(response);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async totalDataBySessionAndDevice(req, res) {
        try {
            const { deviceId, sessionId } = req.body;
            await sessionQueries.totalDataBySessionAndDevice(sessionId, deviceId)
                .then(response => {
                    return res.status(200).send(response);
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }


    async deviceStat(req, res) {
        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371e3; // Радиус Земли в метрах
            const φ1 = lat1 * Math.PI / 180;
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c;
        }

        function calculateAverageSpeed(data) {
            let totalDistance = 0;
            let totalTime = 0;

            for (let i = 1; i < data.length; i++) {
                const prevPoint = data[i - 1];
                const currPoint = data[i];

                const distance = calculateDistance(prevPoint.latitude, prevPoint.longitude, currPoint.latitude, currPoint.longitude);
                const timeDiff = (new Date(currPoint.time) - new Date(prevPoint.time)) / 1000;

                totalDistance += distance;
                totalTime += timeDiff;
            }

            return {
                avg_speed: totalDistance / totalTime,
                total_distance: totalDistance
            };
        }

        try {
            const { deviceId, sessionId } = req.body;
            await sessionQueries.metricsStat(sessionId, deviceId)
                .then(async response => {
                    const gspPoints = await sessionQueries.gpsPoints(sessionId, deviceId);
                    const stepsWithTime = await sessionQueries.stepsWithTime(sessionId, deviceId);
                    const stat = calculateAverageSpeed(gspPoints);
                    console.log("Средняя скорость:", stat["avg_speed"], "м/с");
                    console.log("Пройденное расстояние:", stat["total_distance"], "м");

                    return res.status(200).send({...response[0], ...stat, ...stepsWithTime[0]});
                })
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }


}

module.exports = new SessionController()