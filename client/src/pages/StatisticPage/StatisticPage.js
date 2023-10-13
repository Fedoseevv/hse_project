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
    const [ periodData, setPeriodData ] = useState([]);
    const [ isShow, setIsShow ] = useState(false)


    const getData = useCallback(async () => {
        const body = {
            sessionId: sessionId,
            deviceId: deviceId
        }
        const fetched = await request('/api/sessions/totalByDevice', 'POST', body);
        console.log(fetched)
        setPeriodData(fetched)
        setAllData(fetched);
    }, [])

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
        // const start = startDt.replace("T", " ") + ":00"
        // const end = endDt.replace("T", " ") + ":00"
        // console.log(`start date: ${start}`)
        // console.log(`end date: ${end}`)
        // const body = {
        //     startDate: start,
        //     endDate: end
        // }
        //
        // await request("/api/monitoring/period", "POST", body)
        //     .then(response => {
        //         setPeriodData(response);
        //     });

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