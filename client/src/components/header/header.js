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
                        <li><Link  to={'/'}>Главная страница</Link></li>
                        <li><Link to={'/monitoring'}>Мониторинг</Link></li>
                        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                        <div className={"clear"}></div>
                    </ul>
                </div>
            </div>
    }
    return (
        <>{elem}</>
    )
}