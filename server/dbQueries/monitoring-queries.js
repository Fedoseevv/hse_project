const pool = require('../db-connector');
const {request} = require('express');

const addRecord = (latitude, longitude, coordX, coordY, coordZ, heartBit, currTimestamp) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO  public.monitoring (id, session_id, device_id, pulse, longitude, latitude, aox, aoy, aoz, current_ts) " + 
                    "VALUES (DEFAULT, NULL, NULL, $6, $2, $1, $3, $4, $5, DEFAULT)", [latitude, longitude, coordX, coordY, coordZ, heartBit],
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

const getLast3S = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT *, (now()::timestamp - current_ts) as diff \n" +
            "FROM public.monitoring \n" +
            "WHERE (now()::timestamp - current_ts) < '00:00:03.000000'" +
            "ORDER BY id ASC", [],
            (error, result) => {
                if (error) {
                    reject(error)
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
    getLast3S
}