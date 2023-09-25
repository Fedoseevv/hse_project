const pool = require('../db-connector');
const {request} = require('express');

const allSessions = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.session", [],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const sessionById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.session WHERE session_id=$1", [id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            })
    })
}

const startSession = (id, name) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO public.session (session_id, session_name, start, end) " +
            "VALUES ($1, $2, DEFAULT, DEFAULT)", [id, name],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно добавлена")
                }
            })
    })
}

const closeSession = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE public.session SET end=CURRENT_TIMESTAMP WHERE id=$1", [id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Сессия успешно закрыта");
                }
            })
    })
}

const bindDeviceAndPerson = (sessionId, userId, deviceId) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO public.binding_devices (id, session_id, user_id, device_id) " +
            "VALUES (DEFAULT, $1, $2, $3)", [sessionId, userId, deviceId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно добавлена!")
                }
            })
    })
}


module.exports = {
    allSessions,
    sessionById,
    startSession,
    closeSession,

    bindDeviceAndPerson

}