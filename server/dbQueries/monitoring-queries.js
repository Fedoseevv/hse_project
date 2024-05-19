const pool = require('../db-connector');
const {request} = require('express');

const addRecord = (device_id, pulse, longitude, latitude, aox, aoy, aoz, steps, activeTime) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO  public.monitoring (id, device_id, pulse, longitude, latitude, aox, aoy, aoz, current_ts, steps, active_time) " +
                    "VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, DEFAULT, $8, $9)",
            [device_id, pulse, longitude, latitude, aox, aoy, aoz, steps, activeTime],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    results.isAdded = true;
                    resolve("Запись успешно добавлена");
                }
            })
    });
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.monitoring ORDER BY id ASC", [],
        (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    })
}

const getGreaterThenId = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.monitoring WHERE id > $1 ORDER BY id ASC", [id],
        (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    })
}

const getMaxId = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT MAX(id) FROM public.monitoring", [],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const getLast3S = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT *, (now()::timestamp - current_ts) as diff \n" +
            "FROM public.monitoring \n" +
            "WHERE (now()::timestamp - current_ts) <= '00:00:03.000000' AND device_id=$1" +
            "ORDER BY current_ts ASC", [id],
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const dataByPeriod = (start, end) => {
    return new Promise((resolve, reject) => {
        pool.query("select id, session_id, device_id, pulse, longitude,\n" +
            "latitude, aox, aoy, aoz, \n" +
            "sqrt(aox * aox + aoy * aoy + aoz * aoz) as a, current_ts\n" +
            "from public.monitoring\n" +
            "where current_ts >= $1\n" +
            "and current_ts <= $2\n" +
            "order by id", [start, end],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const lastPosition = (deviceId) => {
    return new Promise((resolve, reject) => {
        pool.query("select * from public.monitoring \n" +
            "join binding_devices using(device_id)\n" +
            "join person using (user_id)\n" +
            "where device_id=$1" +
            "order by monitoring.id desc\n" +
            "limit 1", [deviceId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            })
    })
}

const allPositionsBySession = (sessionId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT\n" +
            "number,\n" +
            "device_id,\n" +
            "longitude,\n" +
            "latitude\n" +
            "FROM (\n" +
            "select \n" +
            "number, \n" +
            "binding_devices.device_id, \n" +
            "longitude, \n" +
            "latitude,\n" +
            "ROW_NUMBER() OVER (PARTITION BY binding_devices.device_id ORDER BY current_ts desc) rnk\n" +
            "from public.monitoring\n" +
            "join binding_devices using(device_id)\n" +
            "join person using (user_id)\n" +
            "where binding_devices.session_id=$1\n" +
            ") as subq\n" +
            "WHERE rnk=1", [sessionId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

module.exports = {
    addRecord,
    getAll,
    getGreaterThenId,
    getMaxId,
    getLast3S,
    dataByPeriod,
    lastPosition,
    allPositionsBySession
}