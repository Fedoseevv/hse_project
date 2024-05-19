import './DeviceItem.css';
import {useState} from "react";
import {useInput} from "../../../hooks/validationHook";
import {Modal} from "../../../components/modal/Modal";

export const DeviceItem = ({ item, onDeleteHandler, onEditHandler }) => {

    const [ active, setActive ] = useState(false);
    const deviceId = item.device_id
    const alias = useInput(item.alias, {isEmpty: true, minLength: 1});

    const prepForUpdate = async () => {
        const body = {
            device_id: deviceId,
            alias: alias.value
        }

        await onEditHandler(body)
    }

    const openModal = () => {
        alias.setValue(item.alias)
        setActive(true)
    }

    return (
        <div className={"player"}>
            <div className="player-item">
                <div className="player-field">Id: {item.device_id}</div>
                <div className="player-field">Название: {item.alias}</div>
            </div>
            <div className="player-btns">
                <button
                    className="player-btn"
                    onClick={openModal}>
                    Редактировать
                </button>
                <button
                    onClick={() => onDeleteHandler(item.device_id)}
                    className="player-btn">
                    Удалить
                </button>
            </div>
            <Modal active={active} setActive={setActive}>
                <div className="devices-modal">
                    <div className="user-modal-header">Изменение устройства</div>
                    <div className={"user-modal-id"}>id устройства: {item.device_id}</div>
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
                            onClick={prepForUpdate}
                            className="player-btn user-btn user-btn-modal">
                            Сохранить
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