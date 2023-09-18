import './UsersItem.css';
import {Modal} from "../../../components/modal/Modal";
import {useState} from "react";

export const UsersItem = ({ item, onEditHandler, onDeleteHandler }) => {
    const [ active, setActive ] = useState(false);

    return (
        <div className={"player"}>
            <div className="player-item">
                <div className="player-field">Имя: {item.name}</div>
                <div className="player-field">Фамилия: {item.surname}</div>
                <div className="player-field">Вес: {item.weight} кг.</div>
                <div className="player-field">Рост: {item.height} см.</div>
                <div className="player-field">Игровая позиция: {item.position.toUpperCase()}</div>
                <div className="player-field">Возраст: {item.age} лет</div>
            </div>
            <div className="player-btns">
                <button
                    onClick={() => setActive(true)}
                    className="player-btn">
                    Редактировать
                </button>
                <button
                    onClick={() => onDeleteHandler(item.user_id)}
                    className="player-btn">
                    Удалить
                </button>
            </div>
            <Modal active={active} setActive={setActive}>
                <div className="player-modal">
                    <h1>hello from modal</h1>
                </div>
            </Modal>
        </div>
    )
}

// surname
// name
// weight 
// height 
// position 
// age 
// user_id