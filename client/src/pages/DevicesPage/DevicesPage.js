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
        {device_id: 1, alias: 'Some alias 1',},
        {device_id: 2, alias: 'Some alias 2',},
        {device_id: 3, alias: 'Some alias 3',},
        {device_id: 4, alias: 'Some alias 4',},
    ]);

    const [chousedDevice, chouseDevice ] = useState({
        alias: '',
    })

    const [open, setOpen] = useState(false);

    const handleOpen = (event, el) => {
        const setedDevice = {...el};
        chouseDevice(setedDevice)
        setOpen(true);

       
    }
    const handleClose = () => setOpen(false);
    const handleChangeAlias = (e) => chouseDevice({
        ...chousedDevice,
        alias: e.target.value,
    });


    const handleCloseWithSaveChange = (e) => {
        const newArray = [...devices];
        const idx = devices.findIndex(el => el.device_id === chousedDevice.device_id);
        newArray[idx] = {...chousedDevice}

        setDevices(newArray);

        handleClose();
    };

    const handleDeliteItem = (event, el) => {
        const newArray = [...devices];
        const filteredArray = newArray.filter((item) => {
            return Number(item.device_id) !== Number(el.device_id)   
        });
        setDevices(filteredArray);
    }
    return (
        <div className={"devices"}>
            <div className={"devices__container"}>
                <div className={"devices__items"} >
                    {
                        devices.map(el => {
                            return <div className="devices__item" key={el.device_id}>
                                        <div className="devices__item--label">
                                            <span>Псевдоним устройства:</span>
                                            {el.alias}
                                        </div>  

                                        <div className="devices__item--actions">
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
                                <TextField id="outlined-basic" value={chousedDevice.alias} onChange={handleChangeAlias} className="mb-1" label="Псевдоним устройства" variant="outlined" />

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