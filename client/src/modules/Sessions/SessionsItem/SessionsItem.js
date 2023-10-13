import './SessionsItem.css';
import {useHttp} from "../../../hooks/httpHook";
import {useInput} from "../../../hooks/validationHook";
import {useState} from "react";
import {Modal} from "../../../components/modal/Modal";
import {Link} from "react-router-dom";

export const SessionsItem = ({ item, onEditHandler, onDeleteHandler, onCloseSession }) => {
    const { loading, request } = useHttp();
    const [ active, setActive ] = useState(false)
    const name = useInput(item.session_name, {isEmpty: true, minLength: 1});

    const prepForUpdate = async () => {
        const body = {
            sessionId: item.session_id,
            sessionName: name.value
        }
        await onEditHandler(body)
    }

    const openModal = () => {
        name.setValue(item.session_name);
        setActive(true)
    }

    return (
        <div className={"player"}>
            <div className="player-item">
                <div className="player-field">Id: {item.session_id}</div>
                <div className="player-field">Название: {item.session_name}</div>
                <div className="player-field">Время начала: {new Date(Date.parse(item.start)).toLocaleDateString() + " " + new Date(Date.parse(item.start)).toLocaleTimeString()}</div>
                <div className="player-field">Статус сессии: <span>{ item.end == null ? "Активна" : "Завершена" }</span></div>
            </div>
            <div className="player-btns">
                <button
                    className="player-btn"
                    onClick={openModal}>
                    Редактировать
                </button>
                <button
                    onClick={async () => await onDeleteHandler(item.session_id)}
                    className="player-btn">
                    Удалить
                </button>
                <button
                    className="player-btn">
                    <Link to={`/s/${item.session_id}`}>
                    Открыть
                    </Link>
                </button>
                <button
                    disabled={item.end !== null}
                    onClick={async () => await onCloseSession(item.session_id)}
                    className="player-btn">
                    Завершить
                </button>
            </div>
            <Modal active={active} setActive={setActive}>
                <div className="devices-modal">
                    <div className="user-modal-header">Изменение сессии</div>
                    <div className="user-modal-content">
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(name.isDirty && name.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Название сессии</div>
                            <input
                                placeholder={"Введите название сессии"}
                                value={name.value}
                                onChange={e => name.onChange(e)}
                                onBlur={e => name.onBlur(e)}
                                type="text"/>
                        </div>
                    </div>
                    <div className="users-btns-modal">
                        <button
                            disabled={name.isEmpty}
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