import './DevicesPage.css';
import {useHttp} from "../../../hooks/httpHook";
import {useHistory} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Loader} from "../../../components/loader/Loader";
import {DeviceItem} from "../DeviceItem/DeviceItem";
import {RecordModal} from "../../DocRecords/RecordModal/RecordModal";
import {useInput} from "../../../hooks/validationHook";
import {Modal} from "../../../components/modal/Modal";

export const DevicesPage = () => {
    const { loading, request } = useHttp();
    const history = useHistory();
    const [ devices, setDevices ] = useState([]);
    const [ active, setActive ] = useState(false);

    const alias = useInput("", {isEmpty: true, minLength: 1});

    const getData = useCallback(async () => {
        const fetched = await request('/api/devices/all', 'GET');
        setDevices(fetched);
    }, [])


    const addDevice = async () => {
        const body = {
            alias: alias.value
        }
        const response = await request('/api/devices/add', 'POST', body)
        setActive(false)
        alias.setValue("")
        alias.setDirty(false)
        await getData()
    }

    const deleteDevice = async (id) => {
        const req = await request(`/api/devices/delete/${id}`, 'GET')
        await getData()
    }

    const updateDevice = async (device) => {
        const body = {
            device_id: device.device_id,
            alias: device.alias
        }
        await request('/api/devices/update', 'POST', body)
        await getData()
    }

    useEffect(async () => {
        await getData()
        console.log(devices)
    }, [getData])

    if (loading) {
        return <Loader />
    }


    return (
        <div className={"devices"}>
            <div className="users-header">Доступные устройства</div>
            <div className="devices-content">
                {
                    devices.map((item, index) => {
                        return <DeviceItem
                                onDeleteHandler={deleteDevice}
                                onEditHandler={updateDevice}
                                item={item}
                                key={index}
                               />
                    })
                }
            </div>
            <div className="users-btns">
                <button
                    onClick={() => setActive(true)}
                    className="player-btn user-btn">
                    Добавить
                </button>
            </div>
            <Modal active={active} setActive={setActive}>
                <div className="devices-modal">
                    <div className="user-modal-header">Добавление устройства</div>
                    <div className="user-modal-content">
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(alias.isDirty && alias.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Название устройства</div>
                            <input
                                placeholder={"Введите псевдоним устройства"}
                                value={alias.value}
                                onChange={e => alias.onChange(e)}
                                onBlur={e => alias.onBlur(e)}
                                type="text"/>
                        </div>
                    </div>
                    <div className="users-btns-modal">
                        <button
                            disabled={alias.isEmpty}
                            onClick={addDevice}
                            className="player-btn user-btn user-btn-modal">
                            Добавить
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