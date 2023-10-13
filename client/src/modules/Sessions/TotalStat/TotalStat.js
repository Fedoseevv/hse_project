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

    const [ slider, setSlider ] = useState({
        value: {
            start: "00:00",
            end: "23:59"
        }
    })

    const featureRef = createRef()

    const [ value, setValue ] = useState([]);

    const getData = useCallback(async () => {
        const fetched = await request(`/api/sessions/sessionWithDevices/${id}`, 'GET');
        setSession(fetched[0]);
        const devicesId = fetched.map(item => item.device_id)
        setDevices(devicesId)

        console.log(devicesId)

    }, []);

    useEffect(async () => {
        await getData()
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
        // this.setState({
        //     value: time
        // });
        setSlider({value: time})
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
                    <div className="time-range-text-item">Время начала: {slider.value.start}</div>
                    <div className="time-range-text-item">Время конца: {slider.value.end}</div>
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
                    value={slider.value}
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