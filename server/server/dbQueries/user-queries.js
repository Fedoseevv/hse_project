const pool = require('../db-connector');
const {request} = require('express');

const registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO public.user (user_id, email, password) VALUES (DEFAULT, $1, $2)",
            [email, password],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    request.isAdded = true;
                    resolve("Пользователь зарегестрирован");
                }
            });
    });
}

const findUser = (email) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM public.user WHERE email = $1", [email],
            (error, result) => {
                if (error) {
                    reject(error);
                }
                request.isFound = true;
                resolve(result.rows);
            });
    });
}

module.exports = {
    registerUser,
    findUser
}