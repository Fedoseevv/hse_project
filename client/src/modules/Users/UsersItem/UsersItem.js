import './UsersItem.css';
import {Modal} from "../../../components/modal/Modal";
import {useState} from "react";
import {useInput} from "../../../hooks/validationHook";
import {RecordModal} from "../../DocRecords/RecordModal/RecordModal";

export const UsersItem = ({ item, onEditHandler, onDeleteHandler }) => {
    const [ active, setActive ] = useState(false);

    const user_id = item.user_id
    const name = useInput(item.name, {isEmpty: true, minLength: 1});
    const surname = useInput(item.surname, {isEmpty: true, minLength: 1});
    const weight = useInput(item.weight, {isEmpty: true, isDigit: 1});
    const height = useInput(item.height, {isEmpty: true, isDigit: 1});
    const position = useInput(item.position, {isEmpty: true, minLength: 2});
    const age = useInput(item.age, {isEmpty: true, isDigit: 1});

    const prepFoUpdate = async () => {
        const body = {
            user_id: user_id,
            name: name.value,
            surname: surname.value,
            weight: weight.value,
            height: height.value,
            position: position.value,
            age: age.value
        }
        await onEditHandler(body)

    }

    const openModal = () => {
        name.setValue(item.name)
        surname.setValue(item.surname)
        weight.setValue(item.weight)
        height.setValue(item.height)
        position.setValue(item.position)
        age.setValue(item.age)
        setActive(true)
    }

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
                    onClick={openModal}
                    className="player-btn">
                    Редактировать
                </button>
                <button
                    onClick={() => onDeleteHandler(item.user_id)}
                    className="player-btn">
                    Удалить
                </button>
            </div>
            <RecordModal active={active} setActive={setActive}>
                <div className="users-modal">
                    <div className="user-modal-header">Редактирование информации</div>
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
                            onClick={prepFoUpdate}
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
            </RecordModal>
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