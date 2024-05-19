import './TotalStat.css';
import {useHistory, useParams} from "react-router-dom";
import {createRef, useCallback, useEffect, useState} from "react";
import {useHttp} from "../../../hooks/httpHook";
import {Loader} from "../../../components/loader/Loader";
import {StatisticPage} from "../../../pages/StatisticPage/StatisticPage";
import TimeRangeSlider from 'react-time-range-slider';
import {MapStatic} from "../../../components/map-static/MapStatic";

export const TotalStat = () => {
    const { id } = useParams();
    const { loading, request } = useHttp();
    const history = useHistory();
    const [ session, setSession ] = useState({});
    const [ devices, setDevices ] = useState([]);
    const [ startTime, setStartTime ] = useState("");
    const [ endTime, setEndTime ] = useState("");

    const [ slider, setSlider ] = useState({
        value: {
            start: "00:00",
            end: "23:59"
        }
    })

    const [ value, setValue ] = useState([]);

    const getData = useCallback(async () => {
        const fetched = await request(`/api/sessions/sessionWithDevices/${id}`, 'GET');
        setSession(fetched[0]);
        setStartTime((new Date(fetched[0].start).toLocaleTimeString()).slice(0, -3));
        setEndTime((new Date(fetched[0].end).toLocaleTimeString()).slice(0, -3));

        console.log(fetched);
        const devicesId = fetched.map(item => item.device_id)
        setDevices(devicesId);
        console.log(`start: ${(new Date(fetched[0].start).toLocaleTimeString()).slice(0, -3)}`);
        console.log(`end: ${(new Date(fetched[0].end).toLocaleTimeString()).slice(0, -3)}`)
        setSlider(prev => ({
            ...prev,
            value: {
                start: startTime,
                end: endTime
            }
        }))
    }, []);

    useEffect(async () => {
        await getData();
    }, [getData])

    const getDateString = (str) => {
        const date = new Date(str).toLocaleDateString()
        const time = new Date(str).toLocaleTimeString()
        return date + " " + time
    }

    const changeStartHandler = (time) => {
        console.log("Start Handler Called", time);
    }

    const timeChangeHandler = (time) => {
        setSlider({value: time})
        setStartTime(time.start);
        setEndTime(time.end)
    }

    const changeCompleteHandler = (time) => {
        console.log("Complete Handler Called", time);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='users'>
            <div className="users-header">Информация по сессии: {session.session_name}</div>
            <div className="users-header">Дата и время начала сессии: {getDateString(session.start)}</div>
            <div className="users-header">Дата и время конца сессии: {getDateString(session.end)}</div>

            <div className={"test"}>
                <div className="time-range-text">
                    <div className="time-range-text-item">Время начала: {startTime}</div>
                    <div className="time-range-text-item">Время конца: {endTime}</div>
                </div>
                <TimeRangeSlider
                    disabled={false}
                    format={24}
                    maxValue={"23:59"}
                    minValue={"00:00"}
                    name={"time_range"}
                    onChangeStart={changeStartHandler}
                    onChangeComplete={changeCompleteHandler}
                    onChange={timeChangeHandler}
                    step={1}
                    value={{start: startTime || "00:00", end: endTime || "23:59"}}
                />
            </div>
            {
                devices.map(device => {
                    return (
                        <>
                            <StatisticPage sessionId={session.session_id} deviceId={device} period={slider.value}/>
                            <MapStatic sessionId={session.session_id} deviceId={device} period={slider.value} label={"test"} />
                        </>
                    )
                })
            }
        </div>
    )
}