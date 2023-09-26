import { useState} from "react";
import './PlayersPage.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
  

export const PlayersPage = () => {

    const [players, setPlayers] = useState([
        {user_id: 1, surname: 'Some surname 1', name: 'Some name 1', weight: 20, height: 20, position: 'center', age: 20 },
        {user_id: 2, surname: 'Some surname 2', name: 'Some name 2', weight: 20, height: 20, position: 'center', age: 20 },
        {user_id: 3, surname: 'Some surname 3', name: 'Some name 3', weight: 20, height: 20, position: 'center', age: 20 },
        {user_id: 4, surname: 'Some surname 4', name: 'Some name 4', weight: 20, height: 20, position: 'center', age: 20 },
    ]);

    const [chousedPlayer, chousePlayer ] = useState({
        user_id: '',
        surname: '',
        name: '',
        weight: 0,
        height: 0,
        position: '',
        age: 0,
    });

    const [open, setOpen] = useState(false);

    const handleOpen = (event, el) => {
        const setedPlayer = {...el};
        chousePlayer(setedPlayer)
        setOpen(true); 
    };

    const handleClose = () => setOpen(false);

    const handleChangeName = (e) => chousePlayer({
        ...chousedPlayer,
        name: e.target.value,
    });

    const handleChangeSurname = (e) => chousePlayer({
        ...chousedPlayer,
        surname: e.target.value,
    });

    const handleChangeWeight = (e) => chousePlayer({
        ...chousedPlayer,
        weight: e.target.value,
    });

    const handleChangeHeight = (e) => chousePlayer({
        ...chousedPlayer,
        height: e.target.value,
    });

    const handleChangePosition = (e) => chousePlayer({
        ...chousedPlayer,
        position: e.target.value,
    });

    const handleChangeAge = (e) => chousePlayer({
        ...chousedPlayer,
        age: e.target.value,
    });

    const handleCloseWithSaveChange = (e) => {
        const newArray = [...players];
        const idx = players.findIndex(el => el.user_id === chousedPlayer.user_id);
        newArray[idx] = {...chousedPlayer};

        setPlayers(newArray);
        chousePlayer({
            user_id: '',
            surname: '',
            name: '',
            weight: 0,
            height: 0,
            position: '',
            age: 0,
        });

        handleClose();
    };

    const handleDeliteItem = (event, el) => {
        const newArray = [...players];


        const filteredArray = newArray.filter((item) => {
            return Number(item.user_id) !== Number(el.user_id)   
        });

        console.log(filteredArray);
        setPlayers(filteredArray);
    }

    return (
        <div className={"players"}>
            <div className={"players__container"}>
                <div className={"players__items"} >
                    {
                        players.map(el => {
                            return <div className="players__item" key={el.user_id}>
                                        <div className="players__item--label">
                                            <span>Фамилия игрока:</span>
                                            {el.surname}
                                        </div>  
                                        <div className="players__item--description">
                                            <span>Имя игрока:</span>
                                            {el.name}
                                        </div>

                                        <div className="players__item--description">
                                            <span>Вес игрока:</span>
                                            {el.weight}
                                        </div>

                                        <div className="players__item--description">
                                            <span>Рост игрока:</span>
                                            {el.height}
                                        </div>

                                        <div className="players__item--description">
                                            <span>Позиция игрока:</span>
                                            {el.position}
                                        </div>

                                        <div className="players__item--description">
                                            <span>Возраст  игрока:</span>
                                            {el.age}
                                        </div>

                                        <div className="players__item--actions">
                                            <button 
                                                className={"btn"}
                                                onClick={(event) => handleOpen(event, el)}
                                            >
                                                Изменить
                                            </button>
                                            <button 
                                                className={"btn"}
                                                onClick={(event) => handleDeliteItem(event, el)}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                </div>
                            
                        })
                    }

                    <Modal
                        open={open }
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="modal-container">
                                <TextField id="outlined-basic" value={chousedPlayer.surname} onChange={handleChangeSurname} className="mb-1" label="Фамилия игрока" variant="outlined" />
                                <TextField id="outlined-basic" value={chousedPlayer.name} onChange={handleChangeName} label="Фамилия игрока" variant="outlined" />
                                <TextField id="outlined-basic" value={chousedPlayer.weight} onChange={handleChangeWeight} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  label="Вес игрока" variant="outlined" />
                                <TextField id="outlined-basic" value={chousedPlayer.height} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  onChange={handleChangeHeight} label=" Рост игрока" variant="outlined" />
                                <TextField id="outlined-basic" value={chousedPlayer.position} onChange={handleChangePosition} label="Позиция игрока" variant="outlined" />
                                <TextField id="outlined-basic" value={chousedPlayer.age} onChange={handleChangeAge}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  label="Возраст игрока" variant="outlined" />

                                <button 
                                    className={"btn"}
                                    onClick={handleCloseWithSaveChange}
                                >
                                    Сохранить
                                </button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>  
        </div>
    )
}