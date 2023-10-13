import {useHttp} from "../../../hooks/httpHook";
import {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Loader} from '../../../components/loader/Loader';

import './UsersPage.css';
import { UsersItem } from "../UsersItem/UsersItem";
import {Modal} from "../../../components/modal/Modal";
import {useInput} from "../../../hooks/validationHook";
import {RecordModal} from "../../DocRecords/RecordModal/RecordModal";

export const UsersPage = () => {
    const { loading, request } = useHttp();
    const history = useHistory();
    const [ players, setPlayers ] = useState([]);

    const [ active, setActive ] = useState(false);

    const getData = useCallback(async () => {
        const fetched = await request('/api/players/all', 'GET');
        setPlayers(fetched);
    }, [])
    const name = useInput("", {isEmpty: true, minLength: 1});
    const surname = useInput("", {isEmpty: true, minLength: 1});
    const weight = useInput("", {isEmpty: true, isDigit: 1});
    const height = useInput("", {isEmpty: true, isDigit: 1});
    const position = useInput("", {isEmpty: true, minLength: 2});
    const age = useInput("", {isEmpty: true, isDigit: 1});

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

    const addUser = async () => {
        const body = {
            name: name.value,
            surname: surname.value,
            weight: weight.value,
            height: height.value,
            position: position.value,
            age: age.value
        }

        const response = await request(`/api/players/add`, 'POST', body)
        setActive(false)
        name.setValue("")
        name.setDirty(false)
        surname.setValue("")
        surname.setDirty(false)
        weight.setValue("")
        weight.setDirty(false)
        height.setValue("")
        height.setDirty(false)
        position.setValue("")
        position.setDirty(false)
        age.setValue("")
        age.setDirty(false)
        await getData()
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
            <div className="users-btns">
                <button
                    onClick={() => setActive(true)}
                    className="player-btn user-btn">
                    Добавить
                </button>
            </div>
            <RecordModal active={active} setActive={setActive}>
                <div className="users-modal">
                    <div className="user-modal-header">Добавление игрока</div>
                    <div className="user-modal-content">
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(name.isDirty && name.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Имя</div>
                            <input
                                placeholder={"Введите имя"}
                                value={name.value}
                                onChange={e => name.onChange(e)}
                                onBlur={e => name.onBlur(e)}
                                type="text"/>
                        </div>
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(surname.isDirty && surname.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Фамилия</div>
                            <input
                                placeholder={"Введите фамилию"}
                                value={surname.value}
                                onChange={e => surname.onChange(e)}
                                onBlur={e => surname.onBlur(e)}
                                type="text"/>
                        </div>
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(weight.isDirty && weight.isEmpty)
                                && <div className="incorrect_value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Вес</div>
                            <input
                                placeholder={"Введите вес (кг.)"}
                                value={weight.value}
                                onChange={e => weight.onChange(e)}
                                onBlur={e => weight.onBlur(e)}
                                type="text"/>
                        </div>
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(height.isDirty && height.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Рост</div>
                            <input
                                placeholder={"Введите рост (см.)"}
                                value={height.value}
                                onChange={e => height.onChange(e)}
                                onBlur={e => height.onBlur(e)}
                                type="text"/>
                        </div>
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(position.isDirty && position.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Игровая позиция</div>
                            <input
                                placeholder={"Введите игровую позицию"}
                                value={position.value}
                                onChange={e => position.onChange(e)}
                                onBlur={e => position.onBlur(e)}
                                type="text"/>
                        </div>
                        <div className={"standard_input__wrap user-modal-input"}>
                            {(age.isDirty && age.isEmpty)
                                && <div className="incorrect_value addPat_incorrect__value incorrect_value__edit incorrect_value-user">Поле не может быть пустым</div>}
                            <div className={"user-modal-name"}>Возраст</div>
                            <input
                                placeholder={"Введите возраст (полных лет)"}
                                value={age.value}
                                onChange={e => age.onChange(e)}
                                onBlur={e => age.onBlur(e)}
                                type="text"/>
                        </div>
                    </div>
                    <div className="users-btns-modal">
                        <button
                            disabled={name.isEmpty || surname.isEmpty || weight.isEmpty
                                || height.isEmpty || position.isEmpty || age.isEmpty}
                            onClick={addUser}
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
            </RecordModal>
        </div>
    )
}