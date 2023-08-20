import {useHttp} from "../../hooks/httpHook";
import {useCallback, useEffect, useState, useRef} from "react";
import {useHistory} from "react-router-dom";
import {Loader} from '../../components/loader/Loader';

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import './MonitoringPage.css';
import {StaticGraph} from "../../components/static-graph/StaticGraph";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

export const MonitoringPage = () => {

    const { loading, request } = useHttp();
    const history = useHistory();
    const [ pulse, setPulse ] = useState([]);
    const [ ts, setTs ] = useState([]);
    const [ allData, setAllData ] = useState([]);
    const [intervalId, setIntervalId] = useState(undefined);
    const [ maxId, setMaxId ] = useState(0);

    const [number, setNumber] = useState(0)

    const getData = useCallback(async () => {
        const fetched = await request('/api/monitoring/all', 'GET');
        setAllData(fetched);
        const pulseFetched = fetched.map(item => parseInt(item.pulse));
        setPulse(pulseFetched);
        // getMaxId()
    }, [])
    useEffect(async () => {
        await getData()
    }, [getData])

    // const getMaxId = () => {
    //     const idList = allData.map(({ id }) => +id)
    //     const id = Math.max(...idList)
    //     setMaxId(id)
    //     return id
    // }

    // const addPoints = async () => {
    //     const fetched = await request(`/api/monitoring/last3s`);
    //     const pulsesNew = fetched.map(item => item.pulse);
    //     setPulse((pulse) => ([ ...pulse, ...pulsesNew]));
    //     setAllData((allData) => ([...allData, ...fetched]));
    // }
    //
    //
    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         await addPoints()
    //         setNumber((prevCount) => prevCount + 1);
    //     }, 3000);
    //
    //     return () => clearInterval(intervalId);
    // }, []);
    //
    // const [ info, setInfo ] = useState({
    //     labels: allData.map(item => item.current_ts),
    //     datasets: [
    //         {
    //             label: allData.map(item => item.current_ts),
    //             data: pulse,
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //                 'rgba(255, 205, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //                 'rgba(255, 205, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //             ],
    //             borderColor: [
    //                 'rgb(255, 99, 132)',
    //                 'rgb(255, 159, 64)',
    //                 'rgb(255, 205, 86)',
    //                 'rgb(75, 192, 192)',
    //                 'rgb(54, 162, 235)',
    //                 'rgb(153, 102, 255)',
    //                 'rgb(255, 99, 132)',
    //                 'rgb(255, 159, 64)',
    //                 'rgb(255, 205, 86)',
    //                 'rgb(75, 192, 192)',
    //                 'rgb(54, 162, 235)',
    //                 'rgb(153, 102, 255)',
    //             ],
    //             borderWidth: 2,
    //         },
    //
    //     ],
    // });
    //
    // useEffect(() => {
    //     setInfo({
    //         labels: allData.map(item => new Date(Date.parse(item.current_ts)).toLocaleTimeString()),
    //         datasets: [
    //             {
    //                 label: "Пульс",
    //                 data: pulse,
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.2)',
    //                     'rgba(255, 159, 64, 0.2)',
    //                     'rgba(255, 205, 86, 0.2)',
    //                     'rgba(75, 192, 192, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(153, 102, 255, 0.2)',
    //                     'rgba(255, 99, 132, 0.2)',
    //                     'rgba(255, 159, 64, 0.2)',
    //                     'rgba(255, 205, 86, 0.2)',
    //                     'rgba(75, 192, 192, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(153, 102, 255, 0.2)',
    //                 ],
    //                 borderColor: [
    //                     'rgb(255, 99, 132)',
    //                     'rgb(255, 159, 64)',
    //                     'rgb(255, 205, 86)',
    //                     'rgb(75, 192, 192)',
    //                     'rgb(54, 162, 235)',
    //                     'rgb(153, 102, 255)',
    //                     'rgb(255, 99, 132)',
    //                     'rgb(255, 159, 64)',
    //                     'rgb(255, 205, 86)',
    //                     'rgb(75, 192, 192)',
    //                     'rgb(54, 162, 235)',
    //                     'rgb(153, 102, 255)',
    //                 ],
    //                 borderWidth: 2,
    //             },
    //
    //         ],
    //     })
    // }, [ pulse ])

    if (loading) {
        return <Loader />
    }

    return (
        <div className={"monitoring"}>
            <h1 className="header">Статистические данные</h1>
            <StaticGraph data={allData} fieldName={"pulse"} header={"Пульс"} label={"пульс"} />
            {/*<Line options={{responsive: true}} ref={chart} data={info} />*/}
        </div>
    )
}