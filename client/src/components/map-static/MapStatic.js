import { useLayoutEffect, useRef, useCallback, useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/httpHook";
import { YMaps, Map, Polyline, Placemark, withYMaps, YMapsApi } from "react-yandex-maps";
import player from '../map-item/content/player.svg'

import '../map-item/MapItem.css';

export const MapStatic = ({ label, sessionId, deviceId }) => {
    const url = "https://www.svgrepo.com/show/307836/football-football-player.svg"
    const { loading, request } = useHttp();
    const [ position, setPosition ] = useState([]);
    const [ start, setStart ] = useState([])
    const [ allPoint, setAllPoints ] = useState([]);
    const [ periodPoints, setPeriodPoints ] = useState([]);

    const getData = useCallback(async () => {
        const body = {
            sessionId: sessionId,
            deviceId: deviceId
        }
        const fetched = await request('/api/sessions/totalByDevice', 'POST', body);
        console.log(fetched)
        let points = []
        fetched.forEach(item => {
            const point = [item["longitude"], item["latitude"]]
            points = [...points, point]
        })
        setStart(points[points.length - 1])
        setAllPoints(points)
        console.log(points)
    }, []);

    useEffect(async () => {
        await getData()
    }, [])

    return (
        <div className={"map-item"}>
            <div className="map-item-header">Геометка спортсмена</div>
            <div className={"online-monitoring-map"}>
                <YMaps>
                    <Map height={750} width={750}
                        // defaultState={{ center: end, zoom: 19,
                        //     controls: ['zoomControl', 'fullscreenControl'] }}
                         state={{ center: start, zoom: 19,
                             controls: ['zoomControl', 'fullscreenControl'] }}
                         modules={['control.ZoomControl', 'control.FullscreenControl']}
                    >
                        <Polyline geometry={allPoint} options={{
                            balloonCloseButton: true,
                            strokeColor: '#216eda',
                            strokeWidth: 5,
                            strokeOpacity: 0.5
                        }} />
                        <Placemark
                            options={{
                                iconCaption: label,
                                iconContent: player,
                                iconLayout: 'default#image',
                                iconImageSize: [35, 35],
                                // Смещение левого верхнего угла иконки относительно
                                // её "ножки" (точки привязки).
                                iconImageOffset: [-5, -38],
                                iconImageHref: url
                            }}
                            properties={{
                                iconCaption: label,
                                // iconContent: player,
                                // iconLayout: 'default#image',
                                // iconImageSize: [30, 42],
                                // // Смещение левого верхнего угла иконки относительно
                                // // её "ножки" (точки привязки).
                                // iconImageOffset: [-5, -38],
                                // iconImageHref: "https://png.pngtree.com/png-vector/20190119/ourmid/pngtree-cartoon-cartoon-boy-athlete-table-tennis-ball-png-image_475956.jpg"
                            }}
                            geometry={start}/>
                    </Map>
                </YMaps>
            </div>
        </div>
    )
}