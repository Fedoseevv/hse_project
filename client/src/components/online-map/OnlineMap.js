import {useHttp} from "../../hooks/httpHook";
import { YMaps, Map, Polyline, Placemark, withYMaps, YMapsApi } from "react-yandex-maps";

import './OnlineMap.css';
import {useCallback, useEffect, useState} from "react";

export const OnlineMap = ({ sessionId }) => {
    const { loading, request } = useHttp();
    const [ players, setPlayers ] = useState([]);
    const [ start, setStart ] = useState([55.83, 37.56995])

    const getData = useCallback(async () => {
        const fetched = await request(`/api/monitoring/positions/all/${sessionId}`);
        setPlayers(fetched);
    }, []);

    useEffect(async () => {
        await getData()
        setInterval(async () => {
            await getData();
        }, 3000);
    }, [getData]);

    const playmarks = players.map(player => {
        return (
            <Placemark
                options={{
                    iconCaption: player.number,
                    iconImageSize: [45, 45],
                    iconImageOffset: [-5, -38],
                }}
                properties={{
                    iconCaption: player.number
                }}
                geometry={player.position}/>
        )
    })

    return (
        <div className={"players-map"}>
            <div className="players-map-header">Позиции игроков</div>
            <div className="players-map-wrap">
                <YMaps>
                    <Map height={1000} width={1000}
                         state={{ center: start, zoom: 19,
                             controls: ['zoomControl', 'fullscreenControl'] }}
                         modules={['control.ZoomControl', 'control.FullscreenControl']}
                    >
                        {playmarks}
                    </Map>
                </YMaps>
            </div>
        </div>
    )
}