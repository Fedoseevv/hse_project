const pool = require('../db-connector');
const {request} = require('express');

const allDevices = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.device", [],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const deviceById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.device WHERE device_id=$1", [id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            })
    })
}

const addDevice = (id, name) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO public.device (device_id, alias) VALUES($1, $2)", [id, name],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно добавлена!");
                }
            })
    })
}

const updateDevice = (id, name) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE public.device SET name=$2 WHERE device_id=$1", [id, name],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно обновлена!");
                }
            })
    })
}

const deleteDevice = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM public.device WHERE device_id=$1", [id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно удалена!");
                }
            })
    })
}

module.exports = {
    allDevices,
    deviceById,
    addDevice,
    updateDevice,
    deleteDevice
}