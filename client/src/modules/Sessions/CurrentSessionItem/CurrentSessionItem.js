import './CurrentSessionItem.css';
import {Link} from "react-router-dom";

export const CurrentSessionItem = ({ item }) => {
    return (
        <div className={"current-session"}>
            <div className="current-session-item">
                <div className="player-field">Игрок: {item.name + " " + item.surname}</div>
                <div className="player-field">Рост: {item.height} см.</div>
                <div className="player-field">Рост: {item.weight} кг.</div>
                <div className="player-field">Возраст: {item.age} лет</div>
                <div className="player-field">Игровая позиция: {item.position}</div>
                <div className="player-field">Устройство: {item.alias}</div>
                <div className="player-field">Пульс: {item.pulse} уд/с</div>
                <div className="player-field">Долгота: {item.longitude}</div>
                <div className="player-field">Широта: {item.latitude}</div>

                <div className="player-field">Ускорение aOx: {item.aox} м/с2</div>
                <div className="player-field">Ускорение aOy: {item.aoy} м/с2</div>
                <div className="player-field">Ускорение aOz: {item.aoz} м/с2</div>
            </div>
            <div className="current-session-btns">
                <button
                    style={{marginTop: "15px", width: "90%"}}
                    className="player-btn">
                    <Link to={`/stat/${item.device_id}`}>
                    Онлайн просмотр статистики
                    </Link>
                </button>
            </div>
        </div>
    )
}