import {useHttp} from "../../hooks/httpHook";
import {useCallback, useEffect, useState, useRef} from "react";
import {useHistory} from "react-router-dom";

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

import './StaticGraph.css';
import {Loader} from "../loader/Loader";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const StaticGraph = ({ data, fieldName, header, label, isShow }) => {
    const chart = useRef(null);
    const { loading, request } = useHttp();
    const history = useHistory();

    const [ show, setShow ] = useState(isShow)


    const [ info, setInfo ] = useState({
        labels: data.map(item => new Date(Date.parse(item.current_ts)).toLocaleDateString() + " - " + new Date(Date.parse(item.current_ts)).toLocaleTimeString()),
        datasets: [
            {
                label: label,
                data: data.map(item => item[fieldName]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 3,
            },

        ],
    });

    useEffect(() => {
        setInfo({
            labels: data.map(item => new Date(Date.parse(item.current_ts)).toLocaleDateString() + " - " + new Date(Date.parse(item.current_ts)).toLocaleTimeString()),
            datasets: [
                {
                    label: label,
                    data: data.map(item => item[fieldName]),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                    ],
                    borderWidth: 3,
                },

            ],
        })
    }, [ data ])

    if (loading) {
        return <Loader />
    }

    return (
        <div className={"graph_item"}>
            <h2 className={"graph_subtitle"}>{header}</h2>
            <Line options={{responsive: true}} data={info} />
        </div>
    )
}