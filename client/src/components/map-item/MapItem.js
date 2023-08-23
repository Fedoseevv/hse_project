import { useLayoutEffect, useRef, useCallback, useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/httpHook";
import { YMaps, Map, Polyline, Placemark, withYMaps, YMapsApi } from "react-yandex-maps";
import player from './content/player.svg'

import './MapItem.css';

export const MapItem = ({ label }) => {
    const url = "https://www.svgrepo.com/show/307836/football-football-player.svg"
    const { loading, request } = useHttp();
    const [ position, setPosition ] = useState([]);
    const [ start, setStart ] = useState([55.83, 37.56995])

    const getData = useCallback(async () => {
        const fetched = await request('/api/monitoring/lastPos');
        setPosition([fetched["longitude"], fetched["latitude"]]);
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
                        // defaultState={{ center: end, zoom: 19,
                        //     controls: ['zoomControl', 'fullscreenControl'] }}
                         state={{ center: start, zoom: 19,
                             controls: ['zoomControl', 'fullscreenControl'] }}
                         modules={['control.ZoomControl', 'control.FullscreenControl']}
                    >
                        {/*<Polyline geometry={[start, end]} options={{*/}
                        {/*    balloonCloseButton: true,*/}
                        {/*    strokeColor: '#216eda',*/}
                        {/*    strokeWidth: 5,*/}
                        {/*    strokeOpacity: 0.5*/}
                        {/*}} />*/}
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
                            geometry={position}/>
                    </Map>
                </YMaps>
            </div>
        </div>
    )
}