import { useLayoutEffect, useRef, useCallback, useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/httpHook";
import { YMaps, Map, Polyline, Placemark, withYMaps, YMapsApi } from "react-yandex-maps";
import player from './content/player.svg'

import './MapItem.css';

export const MapItem = ({ label, deviceId }) => {
    const url = "https://www.svgrepo.com/show/307836/football-football-player.svg"
    const { loading, request } = useHttp();
    const [ position, setPosition ] = useState([]);
    const [ start, setStart ] = useState([55.83, 37.56995])
    const [ allPoint, setAllPoints ] = useState([]);
    const [ number, setNumber ] = useState(label)

    const getData = useCallback(async () => {
        const fetched = await request(`/api/monitoring/lastPos/${deviceId}`);
        setPosition([fetched["longitude"], fetched["latitude"]]);
        setNumber(fetched["number"].toString());
    }, []);

    useEffect(async () => {
        await getData()
        setInterval(async () => {
            console.log("again fetched")
            await getData();
        }, 3000);
    }, [getData])

    return (
        <div className={"map-item"}>
            <div className="map-item-header">Геометка спортсмена</div>
            <div className={"online-monitoring-map"}>
                <YMaps>
                    <Map height={750} width={750}
                        defaultState={{ center: position, zoom: 19,
                            controls: ['zoomControl', 'fullscreenControl'] }}
                         state={{ center: start, zoom: 19,
                             controls: ['zoomControl', 'fullscreenControl'] }}
                         modules={['control.ZoomControl', 'control.FullscreenControl']}
                    >
                        <Placemark
                            options={{
                                iconCaption: number,
                                iconImageSize: [45, 45],
                                iconImageOffset: [-5, -38],

                            }}
                            properties={{
                                iconCaption: number
                            }}
                            geometry={position}/>
                    </Map>
                </YMaps>
            </div>
        </div>
    )
}