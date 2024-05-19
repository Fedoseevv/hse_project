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

const sessionWithDevicesById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("select *\n" +
            "from public.binding_devices\n" +
            "join public.session using (session_id)\n" +
            "where session.session_id=$1", [id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const totalDataBySessionAndDevice = (sessionId, deviceId) => {
    return new Promise((resolve, reject) => {
        pool.query("select *, sqrt(aox*aox + aoy*aoy + aoz*aoz) as a\n" +
            "from public.binding_devices\n" +
            "join public.session using (session_id)\n" +
            "join public.monitoring using (device_id)\n" +
            "join public.person using(user_id)\n" +
            "where session.session_id=$1 \n" +
            "and current_ts >= start and current_ts <= \"end\"\n" +
            "and device_id=$2 \n" +
            "order by current_ts asc", [sessionId, deviceId],
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result.rows)
                }
            })
    })
}

const metricsStat = (sessionId, deviceId) => {
    return new Promise((resolve, reject) => {
        pool.query("select \n" +
            "s.session_id,\n" +
            "user_id, \n" +
            "device_id, \n" +
            "avg(pulse) as pulse_avg, \n" +
            "max(pulse) as pulse_max, \n" +
            "min(pulse) as pulse_min, \n" +
            "avg(aox) as aox_avg,\n" +
            "avg(aoy) as aoy_avg,\n" +
            "avg(aoz) as aoz_avg,\n" +
            "avg(sqrt(aox*aox + aoy*aoy + aoz*aoz)) as a_avg,\n" +
            "percentile_cont(0.5) WITHIN GROUP (ORDER BY pulse) as median_pulse,\n" +
            "percentile_cont(0.5) WITHIN GROUP (ORDER BY aox) as median_aox,\n" +
            "percentile_cont(0.5) WITHIN GROUP (ORDER BY aoy) as median_aoy,\n" +
            "percentile_cont(0.5) WITHIN GROUP (ORDER BY aoz) as median_aoz,\n" +
            "percentile_cont(0.5) WITHIN GROUP (ORDER BY sqrt(aox*aox + aoy*aoy + aoz*aoz)) as median_a,\n" +
            "\n" +
            "var_pop(pulse) as disp_pulse,\n" +
            "stddev_samp(pulse) as kw_pulse\n" +
            "\n" +
            "from public.binding_devices bd join public.session s using (session_id)\n" +
            "join public.monitoring mon using (device_id)\n" +
            "join public.person pers using(user_id)\n" +
            "where current_ts >= start and current_ts <= \"end\"\n" +
            "  group by s.session_id, user_id, device_id\n" +
            "  HAVING s.session_id=$1 AND device_id=$2\n" +
            "  order by s.session_id, user_id, device_id", [sessionId, deviceId],
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result.rows)
                }
            })
    })
}

const gpsPoints = (sessionId, deviceId) => {
    return new Promise((resolve, reject) => {
        pool.query("select longitude, latitude, current_ts as time\n" +
            "from public.binding_devices bd join public.session s using (session_id)\n" +
            "join public.monitoring mon using (device_id)\n" +
            "join public.person pers using(user_id)\n" +
            "WHERE s.session_id=$1 AND device_id=$2\n" +
            "and current_ts >= start and current_ts <= \"end\"\n" +
            "ORDER BY current_ts asc", [sessionId, deviceId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const stepsWithTime = (sessionId, deviceId) => {
    return new Promise((resolve, reject) => {
        pool.query("select steps, active_time, current_ts as time\n" +
            "from public.binding_devices bd join public.session s using (session_id)\n" +
            "join public.monitoring mon using (device_id)\n" +
            "join public.person pers using(user_id)\n" +
            "WHERE s.session_id=$1 AND device_id=$2\n" +
            "and current_ts >= start and current_ts <= \"end\"\n" +
            "ORDER BY current_ts desc limit 1", [sessionId, deviceId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const sessionDataById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("select *\n" +
            "from (\n" +
            "select user_id, device_id, alias, session.session_id, session_name, start, \"end\", pulse, longitude, latitude, aox, aoy, aoz, current_ts, surname, name, weight, height, position, age,\n" +
            "row_number() OVER (PARTITION BY session.session_id, user_id, binding_devices.device_id ORDER BY current_ts desc) as rnk\n" +
            "from  public.session JOIN public.binding_devices USING (session_id)\n" +
            "LEFT JOIN public.monitoring USING (device_id)\n" +
            "LEFT JOIN public.person USING (user_id)\n" +
            "LEFT JOIN public.device USING (device_id)\n" +
            "where session.session_id=$1\n" +
            ") subq\n" +
            "where rnk=1 order by user_id", [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
    })
}

const startSession = (id, name) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO public.session (session_id, session_name, start, \"end\") " +
            "VALUES ($1, $2, DEFAULT, NULL)", [id, name],
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
        pool.query("UPDATE public.session SET \"end\"=CURRENT_TIMESTAMP WHERE session_id=$1", [id],
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

const updateSession = (sessionId, sessionName) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE public.session SET session_name=$2 WHERE session_id=$1", [sessionId, sessionName],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно обновлена!")
                }
            })
    })
}

const deleteSession = (sessionId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM public.session WHERE session_id=$1", [sessionId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно удалена!")
                }
            })
    })
}

const deleteSessionDevices = (sessionId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM public.binding_devices WHERE session_id=$1", [sessionId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Запись успешно удалена!")
                }
            })
    })
}

module.exports = {
    allSessions,
    sessionById,
    startSession,
    closeSession,
    updateSession,
    deleteSession,
    deleteSessionDevices,
    bindDeviceAndPerson,
    sessionDataById,
    sessionWithDevicesById,
    totalDataBySessionAndDevice,
    metricsStat,
    gpsPoints,
    stepsWithTime
}