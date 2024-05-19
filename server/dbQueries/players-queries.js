const pool = require('../db-connector');
const {request} = require('express');

const addRecord = (user_id, surname, name, weight, height, position, age, number) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO public.person (user_id, surname, name, weight, height, position, age, number)" +
                    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [user_id, surname, name, weight, height, position, age, number],
                    (error, results) => {
                        if (error) {
                            reject(error)
                        } else {
                            results.isAdded = true;
                            resolve("Запись успешно добавлена!");
                        }
                    })
    })
}

const updateRecord = (user_id, surname, name, weight, height, position, age, number) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE public.person SET surname=$2, name=$3, weight=$4, height=$5, position=$6, age=$7, number=$8 WHERE user_id=$1",
            [user_id, surname, name, weight, height, position, age, number],
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Запись успешно обновлена!");
                }
            })
    })
}

const allRecords = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.person", [], 
        (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    })
}

const deleteRecordById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM public.person where user_id=$1", [id], 
        (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve("Запись успешно удалена!");
            }
        })
    })
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.person where user_id=$1", [id], 
        (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows[0]);
            }
        })
    })
}

module.exports = {
    addRecord,
    allRecords,
    deleteRecordById,
    getById,

    updateRecord
}