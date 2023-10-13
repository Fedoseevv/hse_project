import './SessionsPage.css';
import {useHttp} from "../../../hooks/httpHook";
import {useHistory} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useInput} from "../../../hooks/validationHook";
import {Loader} from "../../../components/loader/Loader";
import {SessionsItem} from "../SessionsItem/SessionsItem";
import {Modal} from "../../../components/modal/Modal";

export const SessionsPage = () => {
    const { loading, request } = useHttp();
    const history = useHistory();
    const [ active, setActive ] = useState(false);

    const [ userDevice, setUserDevice ] = useState([]);

    const [ sessions, setSessions ] = useState([]);
    const [ devices, setDevices ]= useState([]);
    const [ players, setPlayers ] = useState([]);

    const [ curPlayer, setCurPlayer ] = useState({});
    const [ curDevice, setCurDevice ] = useState({});

    const sessionName = useInput("", {isEmpty: true, minLength: 1});

    const getData = useCallback(async () => {
        const playersFetched = await request('/api/players/all', 'GET');
        const devicesFetched = await request('/api/devices/all', 'GET');
        const sessionsFetched = await request('/api/sessions/all', 'GET');

        setPlayers(playersFetched);
        setDevices(devicesFetched);
        setSessions(sessionsFetched);
        setCurPlayer(playersFetched[0]);
        setCurDevice(devicesFetched[0]);
    }, []);

    useEffect(async () => {
        await getData()
    }, [getData]);

    const deleteSession = async (id) => {
        const req = await request(`/api/sessions/delete/${id}`);
        await getData();
    }

    const editSession = async (body) => {
        const req = await request('/api/sessions/update', 'POST', body);
        await getData();
    }

    const closeSession = async (id) => {
        const req = await request(`/api/sessions/close/${id}`, 'GET');
        await getData();
    }

    const addUserDevice = (e) => {
        console.log(curPlayer)
        console.log(curDevice)
        setUserDevice((prev) => [...prev, {
            user_id: curPlayer.user_id,
            name: curPlayer.name,
            surname: curPlayer.surname,
            device_id: curDevice.device_id,
            alias: curDevice.alias
        }]);
    }

    const deleteUserDevice = (e) => {
        const arr = e.target.value.split(";")
        const userId = arr[0]
        const deviceId = arr[1]
        console.log(userId)
        console.log(deviceId)
        setUserDevice((prev) => prev.filter(item => item.user_id !== userId && item.device_id !== deviceId))
    }

    const changePlayer = (e) => {
        const player = players.filter(item => item.user_id === e.target.value)[0]
        setCurPlayer(player)
    }

    const changeDevice = (e) => {
        const device = devices.filter(item => item.device_id === e.target.value)[0]
        setCurDevice(device)
    }

    const addSession = async () => {
        console.log(userDevice)
        const body = {
            userDevice,
            sessionName: sessionName.value
        }
        const req = await request('/api/sessions/start', 'POST', body)

        setActive(false);
        sessionName.setValue("");
        sessionName.setDirty(false);
        setUserDevice([]);
        await getData();
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className={"sessions"}>
            <div className="sessions-header">Созданные сессии</div>
            <div className="sessions-content">
                {
                    sessions.map((item, ind) => {
                        return <SessionsItem
                                    item={item}
                                    onDeleteHandler={deleteSession}
                                    onEditHandler={editSession}
                                    onCloseSession={closeSession}
                                    key={ind} />
                    })
                }
            </div>
            <div className="sessions-btns">
                <button
                    className="player-btn user-btn user-btn-modal"
                    onClick={() => setActive(true)}>
                    Добавить
                </button>
            </div>
            <Modal active={active} setActive={setActive}>
                <div className="devices-modal">
                    <div className="user-modal-header">Создание сессии</div>
                    <div className="user-modal-content">
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(sessionName.isDirty && sessionName.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Название сессии</div>
                            <input
                                placeholder={"Введите название сессии"}
                                value={sessionName.value}
                                onChange={e => sessionName.onChange(e)}
                                onBlur={e => sessionName.onBlur(e)}
                                type="text"/>
                        </div>
                    </div>
                    <div className="binding-items">
                        <select className="auth_form__role"
                                onChange={changeDevice}
                                name="device" id="device">
                            {devices.map(item => (
                                <option key={item.device_id} value={item.device_id}>
                                    {item.alias}
                                </option>
                            ))}
                        </select>
                        <select className="auth_form__role"
                                onChange={changePlayer}
                                name="player" id="player">
                            {players.map(item => (
                                <option key={item.user_id} value={item.user_id}>
                                    {item.name + " " + item.surname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={addUserDevice}
                        className="standard_btn session-modal-btn"
                    >Добавить связку
                    </button>
                    <div className={"binding-items-text"}>
                        {
                            userDevice.length === 0 && <div>Выберите устройства и игроков</div>
                        }
                        {
                            userDevice.map((item, index) => {
                                return <button
                                    value={item.user_id + ";" + item.device_id}
                                    style={{border: "none", backgroundColor: "transparent"}}
                                    onClick={deleteUserDevice}
                                    >
                                    {index + 1}. {item.alias + " - " + item.name + " " + item.surname}
                                </button>
                            })
                        }
                    </div>
                    <div className="users-btns-modal">
                        <button
                            disabled={sessionName.isEmpty || userDevice.length === 0}
                            onClick={addSession}
                            className="player-btn user-btn user-btn-modal">
                            Создать
                        </button>
                        <button
                            onClick={() => setActive(false)}
                            className="player-btn user-btn user-btn-modal">
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}