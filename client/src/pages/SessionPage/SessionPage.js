import { useState} from "react";
import { styled } from '@mui/material/styles';
import './SessionPage.css';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    
    p: 4,
};

export const SessionPage = () => {
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState('');
    const [device, setDevice] = useState('');

    const devices = [
        {id: 1, name: 'Some name 1', description: 'Some description 1'},
        {id: 2, name: 'Some name 2', description: 'Some description 2'},
        {id: 3, name: 'Some name 3', description: 'Some description 3'},
        {id: 4, name: 'Some name 4', description: 'Some description 4'},
    ];

    const players = [
        {id: 1, name: 'Some name 1', description: 'Some description 1'},
        {id: 2, name: 'Some name 2', description: 'Some description 2'},
        {id: 3, name: 'Some name 3', description: 'Some description 3'},
        {id: 4, name: 'Some name 4', description: 'Some description 4'},
    ];


    const [sessions, setSessions] = useState([]);

    const handleCreateSession = () => {
        setOpen(true);
    };

    const createSession = () => {
        setOpen(false);
        const newArray = [...sessions];
        const sessionPlayer = {
            ...players.find(el => el.id === player)
        };

        const sessionDevice = {
            ...players.find(el => el.id === device)
        };
        newArray.push({
            ...sessionPlayer,
            device: {
                ...sessionDevice
            }
        });

        setSessions(newArray);
        setPlayer('');
        setDevice('');

    };


    const handleChangePlayer = (event) => {
        setPlayer(event.target.value);
    };


    const handleChangeDevices = (event) => {
        setDevice(event.target.value);
    };

    const handleClose = () => setOpen(false);
    const handleOpen = (event, el) => {
        setOpen(true);
    };

    return (
        <div className={"session"}>
            <div className={"session__container"}>
                <Button variant="contained" color="primary" onClick={handleCreateSession}>
                    Создать сессию
                </Button>
                <div className={"session__items"} >
                    {
                        (sessions && sessions.length)  ?  sessions.map(el => {
                            return <div className="devices__item" key={el.id}>
                                        <div className="devices__item--label">
                                            Название игрока:
                                            {el.name}
                                        </div>  
                                        <div className="devices__item--description">
                                            Название устроиств:
                                            {el.device.name}
                                        </div>
                                </div>
                            
                        }) : ''
                    }

                    <Modal
                        open={open }
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', ...style }}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
                                <InputLabel htmlFor="demo-dialog-native">Выбирете игрока</InputLabel>
                                <Select
                                    labelId="demo-dialog-native"
                                    value={player}
                                    onChange={handleChangePlayer}
                                >
                                    {
                                        players.map(el => {
                                            return <MenuItem value={el.id} key={el.id}>
                                            <em>{el.name}</em>
                                          </MenuItem>
                                        })

                                        
                                    }
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
                                <InputLabel id="demo-dialog-select-label">Выберете устройство</InputLabel>
                                <Select 
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={device}
                                    onChange={handleChangeDevices}
                                >
                                    
                                    {
                                        devices.map(el => {
                                            return <MenuItem value={el.id} key={el.id}>
                                            <em>{el.name}</em>
                                          </MenuItem>
                                        })

                                    }
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={createSession}>
                                Создать
                            </Button>
                        </Box>
                     
                    </Modal>
                </div>
            </div>  
        </div>
    )
}