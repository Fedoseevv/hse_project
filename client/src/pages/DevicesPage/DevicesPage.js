import { useState} from "react";
import './DevicesPage.css';
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
  


export const DevicesPage = () => {

    const [devices, setDevices] = useState([
        {id: 1, name: 'Some name 1', description: 'Some description 1'},
        {id: 2, name: 'Some name 2', description: 'Some description 2'},
        {id: 3, name: 'Some name 3', description: 'Some description 3'},
        {id: 4, name: 'Some name 4', description: 'Some description 4'},
    ]);

    const [chousedDevice, chouseDevice ] = useState({
        name: '',
        description: ''
    })

    const [open, setOpen] = useState(false);

    const handleOpen = (event, el) => {
        const setedDevice = {...el};
        chouseDevice(setedDevice)
        setOpen(true);

       
    }
    const handleClose = () => setOpen(false);
    const handleChangeName = (e) => chouseDevice({
        ...chousedDevice,
        name: e.target.value,
    });

    const handleChangeDescription = (e) => chouseDevice({
        ...chousedDevice,
        description: e.target.value,
    });

    const handleCloseWithSaveChange = (e) => {
        const newArray = [...devices];
        const idx = devices.findIndex(el => el.id === chousedDevice.id);
        newArray[idx] = {...chousedDevice}

        setDevices(newArray);

        handleClose();
    };

    const handleDeliteItem = (event, el) => {
        const newArray = [...devices];
        const filteredArray = newArray.filter((item) => {
            return Number(item.id) !== Number(el.id)   
        });
        setDevices(filteredArray);
    }
    return (
        <div className={"devices"}>
            <div className={"devices__container"}>
                <div className={"devices__items"} >
                    {
                        devices.map(el => {
                            return <div className="devices__item" key={el.id}>
                                        <div className="devices__item--label">
                                            {el.name}
                                        </div>  
                                        <div className="devices__item--description">
                                            {el.description}
                                        </div>

                                        <div className="devices__item--actions">
                                            <Button onClick={(event) => handleOpen(event, el)} variant="contained" className="devices__item--edit-btn">
                                                Редактировать
                                            </Button>
                                            <Button onClick={(event) => handleDeliteItem(event, el)} variant="contained" color="error">
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
                                <TextField id="outlined-basic" value={chousedDevice.name} onChange={handleChangeName} className="mb-1" label="Name" variant="outlined" />
                                <TextField id="outlined-basic" value={chousedDevice.description} onChange={handleChangeDescription} label="Description" variant="outlined" />
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