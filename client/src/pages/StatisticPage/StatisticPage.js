import {useHttp} from "../../hooks/httpHook";
import {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Loader} from '../../components/loader/Loader';
import {StaticGraph} from "../../components/static-graph/StaticGraph";

import './StatisticPage.css';
import {Modal} from "../../components/modal/Modal";
import {load} from "@amcharts/amcharts5/.internal/core/util/Net";


export const StatisticPage = ({ sessionId, deviceId, period }) => {
    const { loading, request } = useHttp();
    const history = useHistory();

    const [ start, setStartDt ] = useState(null);
    const [ end, setEndDt ] = useState(null);
    const [ allData, setAllData ] = useState([]);
    const [ statistic, setStatistic ] = useState({});
    const [ periodData, setPeriodData ] = useState([]);
    const [ isShow, setIsShow ] = useState(false)


    const getData = useCallback(async () => {
        const body = {
            sessionId: sessionId,
            deviceId: deviceId
        }
        console.log(period)
        const fetched = await request('/api/sessions/totalByDevice', 'POST', body);
        const statData = await request('/api/sessions/deviceStat', 'POST', body);
        console.log(fetched)
        setPeriodData(fetched);
        setAllData(fetched);
        setStatistic(statData);
        console.log(statData);
    }, []);

    const upd = async () => {
        const body = {
            sessionId: sessionId,
            deviceId: deviceId
        }
        const fetched = await request('/api/sessions/totalByDevice', 'POST', body);
        console.log(fetched)
        setPeriodData(fetched)
        setAllData(fetched);
    }

    useEffect(async () => {
        await getData()
    }, [])

    const changePeriods = (e) => {
        console.log(e.target.value);
        console.log(e.target.id)
        if (e.target.id === "start-dt") {
            setStartDt(e.target.value)
        } else if (e.target.id === "end-dt") {
            setEndDt(e.target.value)
        }
    }

    const createReport = async () => {
        const tmp = new Date(allData[0].start).toLocaleDateString().split(".")
        const today = tmp[2] + "-" + tmp[1] + "-" + tmp[0]

        const startWithSec = today + " " + period.start + ":00"

        const endWithSec = today + " " + period.end + ":00"
        console.log(`start: ${startWithSec}`)
        console.log(`end: ${endWithSec}`)

        const body = {
            startDate: startWithSec,
            endDate: endWithSec
        }

        await request("/api/monitoring/period", "POST", body)
            .then(response => {
                console.log(response)
                setPeriodData(response);
            });
    }


    if (loading) {
        return <Loader />
    }

    return (
        <div className={"monitoring"}>
            <button onClick={async () => await createReport()}
                    className={"btn stat-btn"}>Сформировать отчет</button>
                <div className="header">{allData.length > 0 ? allData[0].surname + " " + allData[0].name : ""}</div>

                <div className={"common-stats"}>
                    <div className="common-stats-header">Общие статистики по тренировке</div>
                    <div className="common-stats-wrap">
                        <div className="common-stats-elem">
                            <div className="common-stats-subheader">Ускорение:</div>
                            <div className="common-stats-body">
                                <div className="stats-body-item">Среднее ускорение: {Number(statistic["a_avg"]).toFixed(3)} м/с²</div>
                                <div className="stats-body-item">Среднее ускорение oX: {Number(statistic["aox_avg"]).toFixed(3)} м/с²</div>
                                <div className="stats-body-item">Среднее ускорение oY: {Number(statistic["aoy_avg"]).toFixed(3)} м/с²</div>
                                <div className="stats-body-item">Среднее ускорение oZ: {Number(statistic["aoz_avg"]).toFixed(3)} м/с²</div>

                                <div className="stats-body-item">Медианное ускорение: {Number(statistic["median_a"]).toFixed(3)} м/с²</div>
                                <div className="stats-body-item">Медианное ускорение oX: {Number(statistic["median_aox"]).toFixed(3)} м/с²</div>
                                <div className="stats-body-item">Медианное ускорение oY: {Number(statistic["median_aoy"]).toFixed(3)} м/с²</div>
                                <div className="stats-body-item">Медианное ускорение oZ: {Number(statistic["median_aoz"]).toFixed(3)} м/с²</div>
                            </div>
                        </div>

                        <div className="common-stats-elem">
                            <div className="common-stats-subheader">Пульс:</div>
                            <div className="common-stats-body">
                                <div className="stats-body-item">Средний пульс: {Number(statistic["pulse_avg"]).toFixed(3)} уд/мин</div>
                                <div className="stats-body-item">Медианный пульс: {Number(statistic["median_pulse"]).toFixed(3)} уд/мин</div>
                                <div className="stats-body-item">Максимальный пульс: {Number(statistic["pulse_max"]).toFixed(3)} уд/мин</div>
                                <div className="stats-body-item">Минимальный пульс: {Number(statistic["pulse_min"]).toFixed(3)} уд/мин</div>
                                <div className="stats-body-item">Дисперсия пульса: {Number(statistic["disp_pulse"]).toFixed(3)}</div>
                                <div className="stats-body-item">Стандартное отклонение: {Number(statistic["kw_pulse"]).toFixed(3)}</div>
                            </div>
                        </div>

                        <div className="common-stats-elem">
                            <div className="common-stats-subheader">Другие показатели:</div>
                            <div className="common-stats-body">
                                <div className="stats-body-item">Общее расстояние: {Number(statistic["total_distance"] / 1000.0).toFixed(3)} км.</div>
                                <div className="stats-body-item">Средняя скорость передвижения: {Number(statistic["avg_speed"] / 1000.0).toFixed(3)} м/сек</div>
                                <div className="stats-body-item">Количество шагов: {Number(statistic["steps"])} шт.</div>
                                <div className="stats-body-item">Время в активной фазе: {(Number(statistic["active_time"]) / 60).toFixed(3)} мин.</div>
                            </div>
                        </div>
                    </div>
                </div>
            {
                <>
                    <StaticGraph data={periodData} fieldName={"pulse"} header={"Пульс"} label={"Пульс"} />
                </>
            }

            {
                <>
                    <StaticGraph data={periodData} fieldName={"aox"} header={"Ускорение oX"} label={"Ускорение oX"} />
                </>
            }

            {
                <>
                    <StaticGraph data={periodData} fieldName={"aoy"} header={"Ускорение oY"} label={"Ускорение oY"} />
                </>
            }

            {
                <>
                    <StaticGraph data={periodData} fieldName={"aoz"} header={"Ускорение oZ"} label={"Ускорение oZ"} />
                </>
            }

            {
                <>
                    <StaticGraph data={allData} fieldName={"a"} header={"Сумма ускорений"} label={"Ускорение"} />
                </>
            }
        </div>
    )
}