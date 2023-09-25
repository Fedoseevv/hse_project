import {useHttp} from "../../hooks/httpHook";
import {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Loader} from '../../components/loader/Loader';
import {StaticGraph} from "../../components/static-graph/StaticGraph";

import './StatisticPage.css';
import {Modal} from "../../components/modal/Modal";


export const StatisticPage = () => {
    const { loading, request } = useHttp();
    const history = useHistory();

    const [ startDt, setStartDt ] = useState(null);
    const [ endDt, setEndDt ] = useState(null);
    const [ allData, setAllData ] = useState([]);

    const [ periodData, setPeriodData ] = useState([]);


    const getData = useCallback(async () => {
        const fetched = await request('/api/monitoring/all', 'GET');
        setAllData(fetched);
    }, [])

    useEffect(async () => {
        await getData()
    }, [getData])

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
        const start = startDt.replace("T", " ") + ":00"
        const end = endDt.replace("T", " ") + ":00"
        console.log(`start date: ${start}`)
        console.log(`end date: ${end}`)
        const body = {
            startDate: start,
            endDate: end
        }

        await request("/api/monitoring/period", "POST", body)
            .then(response => {
                setPeriodData(response);
            });
    }

    return (
        <div className={"monitoring"}>
            <h1 className="header">Статистические данные</h1>
            <div className="text-wrap">
                <div className="text-header">Укажите период для предоставления статистики</div>
                <div className="input-wrap">
                    <input onChange={changePeriods} id={"start-dt"} className={"date-input"} type="datetime-local"/>
                    <input onChange={changePeriods} id={"end-dt"} className={"date-input"} type="datetime-local"/>
                </div>
                <button onClick={createReport}
                        className={"btn"}
                        disabled={startDt == null || endDt == null}>Сформировать отчет</button>
            </div>
            {
                startDt !== null && endDt !== null
                && periodData.length > 0
                && <>
                    <div className="text-wrap text-info">Период отчета:  <span>{startDt.replace("T", " ")}</span> — <span>{endDt.replace("T", " ")}</span></div>
                    <StaticGraph data={periodData} fieldName={"pulse"} header={"Пульс"} label={"Пульс"} />
                </>
            }

            {
                startDt !== null && endDt !== null
                && periodData.length > 0
                && <>
                    <StaticGraph data={periodData} fieldName={"aox"} header={"Ускорение oX"} label={"Ускорение oX"} />
                </>
            }

            {
                startDt !== null && endDt !== null
                && periodData.length > 0
                && <>
                    <StaticGraph data={periodData} fieldName={"aoy"} header={"Ускорение oY"} label={"Ускорение oY"} />
                </>
            }

            {
                startDt !== null && endDt !== null
                && periodData.length > 0
                && <>
                    <StaticGraph data={periodData} fieldName={"aoz"} header={"Ускорение oZ"} label={"Ускорение oZ"} />
                </>
            }

            {
                startDt !== null && endDt !== null
                && periodData.length > 0
                && <>
                    <StaticGraph data={periodData} fieldName={"a"} header={"Сумма ускорений"} label={"Ускорение"} />
                </>
            }

        </div>
    )
}