import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Link, useHistory} from 'react-router-dom';
import './header.css';

export const Header = (props) => {
    const auth = useContext(AuthContext);
    const {isAuth, role} = props;

    const history = useHistory();

    const logoutHandler = (event) => { // Функция выхода из ИС
        event.preventDefault(); // Отменяем стандартное поведение браузера
        auth.logout(); // Выходим
        history.push('/'); // Перекидываем на стр со входом
    }

    let elem = "";
    if (isAuth) {
        elem =
            <div className={"header_container"}>
                <div className="wrapper">
                    <ul className="navigation">
                        <li className={"link_item"}><Link to={'/'}>Пользователи</Link></li>
                        <li className={"link_item"}><Link to={'/devices'}>Устройства</Link></li>
                        <li className={"link_item"}><Link to={"/sessions"}>Сессии</Link></li>
                        <li className={"link_item link_exit"}><a href="/" onClick={logoutHandler}>Выйти</a></li>
                        <div className={"clear"}></div>
                    </ul>
                </div>
            </div>
    }
    return (
        <>{elem}</>
    )
}