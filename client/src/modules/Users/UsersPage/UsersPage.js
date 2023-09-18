import {useHttp} from "../../../hooks/httpHook";
import {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Loader} from '../../../components/loader/Loader';

import './UsersPage.css';
import { UsersItem } from "../UsersItem/UsersItem";

export const UsersPage = () => {
    const { loading, request } = useHttp();
    const history = useHistory();
    const [ players, setPlayers ] = useState([]);

    const getData = useCallback(async () => {
        const fetched = await request('/api/players/all', 'GET');
        setPlayers(fetched);
    }, [])

    const deleteUser = async (id) => {
        const req = await request(`/api/players/delete/${id}`)
        await getData();
    }

    const updateUser = async (player) => {
        const body = {
            user_id: player.user_id,
            surname: player.surname,
            name: player.name,
            weight: player.weight,
            height: player.height,
            position: player.position,
            age: player.age
        }

        await request('/api/players/update', 'POST', body)
        await getData();
    }

    useEffect(async () => {
        await getData()
        console.log(players)
    }, [getData])

    if (loading) {
        return <Loader />
    }
    
    return (
        <div className='users'>
            <div className="users-header">Зарегистрированные пользователи</div>
            <div className="users-content">
            {
                players.map((item, index) => {
                    return <UsersItem
                        onDeleteHandler={deleteUser}
                        onEditHandler={updateUser}
                        item={item}
                        key={index} />
                })
            }
            </div>
        </div>
    )
}