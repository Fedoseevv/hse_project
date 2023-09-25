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
        {id: 1, name: 'Some name 1', description: 'Some description 1'},
        {id: 2, name: 'Some name 2', description: 'Some description 2'},
        {id: 3, name: 'Some name 3', description: 'Some description 3'},
        {id: 4, name: 'Some name 4', description: 'Some description 4'},
    ]);

    const [chousedPlayer, chousePlayer ] = useState({
        name: '',
        description: ''
    })

    const [open, setOpen] = useState(false);

    const handleOpen = (event, el) => {
        const setedPlayer = {...el};
        chousePlayer(setedPlayer)
        setOpen(true);

       
    }
    const handleClose = () => setOpen(false);
    const handleChangeName = (e) => chousePlayer({
        ...chousedPlayer,
        name: e.target.value,
    });

    const handleChangeDescription = (e) => chousePlayer({
        ...chousedPlayer,
        description: e.target.value,
    });

    const handleCloseWithSaveChange = (e) => {
        const newArray = [...players];
        const idx = players.findIndex(el => el.id === chousedPlayer.id);
        newArray[idx] = {...chousedPlayer}

        setPlayers(newArray);

        handleClose();
    };

    const handleDeliteItem = (event, el) => {
        const newArray = [...players];
        const filteredArray = newArray.filter((item) => {
            return Number(item.id) !== Number(el.id)   
        });
        setPlayers(filteredArray);
    }

    return (
        <div className={"players"}>
            <div className={"players__container"}>
                <div className={"players__items"} >
                    {
                        players.map(el => {
                            return <div className="players__item" key={el.id}>
                                        <div className="players__item--label">
                                            {el.name}
                                        </div>  
                                        <div className="players__item--description">
                                            {el.description}
                                        </div>

                                        <div className="players__item--actions">
                                            <Button variant="contained" onClick={(event) => handleOpen(event, el)} className="players__item--edit-btn">
                                                Редактировать
                                            </Button>
                                            <Button variant="contained" onClick={(event) => handleDeliteItem(event, el)} color="error">
                                                Удалить
                                            </Button>
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
                                <TextField id="outlined-basic" value={chousedPlayer.name} onChange={handleChangeName} className="mb-1" label="Name" variant="outlined" />
                                <TextField id="outlined-basic" value={chousedPlayer.description} onChange={handleChangeDescription} label="Description" variant="outlined" />
                                <Button variant="contained" color="error" onClick={handleCloseWithSaveChange}>
                                    Сохранить
                                </Button>
                            </div>
                            
                        </Box>
                    </Modal>
                </div>
            </div>  
        </div>
    )
}