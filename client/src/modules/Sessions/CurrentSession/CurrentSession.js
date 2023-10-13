import './CurrentSession.css';
import {Link, useHistory, useParams} from "react-router-dom";
import {useHttp} from "../../../hooks/httpHook";
import {useCallback, useEffect, useState} from "react";
import {Loader} from "../../../components/loader/Loader";
import {CurrentSessionItem} from "../CurrentSessionItem/CurrentSessionItem";

export const CurrentSession = () => {
    const { id } = useParams()
    const { loading, request } = useHttp();
    const history = useHistory();
    const [ players, setPlayers ] = useState([]);
    const [ session, setSession ] = useState([]);
    const [ cards, setCards ] = useState([]);

    const [ active, setActive ] = useState(false);

    const getData = useCallback(async () => {
        const fetched = await request(`/api/sessions/byId/${id}`, 'GET');
        const onlineData = await request(`/api/sessions/online/${id}`, 'GET');
        setSession(fetched);
        setCards(onlineData);
    }, []);

    useEffect(async () => {
        setInterval(async () => {
            const onlineData = await request(`/api/sessions/online/${id}`, 'GET');
            setCards(onlineData);
        }, 3000);
    }, []);

    useEffect(async () => {
        await getData()
    }, [getData])

    const users = <div className="session-content">
                                {
                                    cards.map((item, ind) => {
                                        return <CurrentSessionItem key={ind} item={item}/>
                                    })
                                }
                            </div>

    const msg = <div className="session-msg">Сессия завершена.</div>

    return (
        <div className='users'>
            <div className="users-header">Название сессии: '{session.session_name}'</div>
            {
                session.end === null ? users : msg
            }
            <div className={"session-btns"}>
                <button
                    disabled={session.end === null}
                    className="session-btn">
                    <Link to={`/fullStat/${session.session_id}`}>
                        Полная статистика сессии
                    </Link>
                </button>
            </div>
        </div>
    )
}