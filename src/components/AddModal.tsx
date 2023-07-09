import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    Box, Button,
    FormControl,
    FormControlLabel,
    FormLabel, Grid,
    InputAdornment, InputLabel, MenuItem,
    Modal, OutlinedInput, Radio,
    RadioGroup, Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import {ModalInfo, Repetition} from "./consts";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
    textAlign: 'center'
};

const AddModal = (modalInfo: ModalInfo) => {
    const entry = modalInfo.entry;
    const tempValue = entry?.value || 1000;
    const [value, setValue] = React.useState( Math.abs(tempValue));
    const [type, setType] = React.useState(tempValue < 0 ? "Loss": "Profit");
    const [name, setName] = React.useState(entry?.name|| "");
    const [repetitions, setRepetition] = React.useState(entry?.repetitions || [Repetition[0]]);

    const onChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType((event.target as HTMLInputElement).value);
    }

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt((event.target as HTMLInputElement).value));
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName((event.target as HTMLInputElement).value);

    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setRepetition( typeof value === "string"? value.split(",") : value);
    };

    const icon = type === "Profit" ? (<AddIcon></AddIcon>) : (<RemoveIcon></RemoveIcon>);
    return (
        <Modal
            open={modalInfo.open}
            onClose={() => {
                modalInfo.onClose();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={2} sx={{my: 4}}>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic"
                                   label="Name"
                                   variant="outlined"
                                   value={name}
                                   onChange={onChangeName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic"
                                   label="Value"
                                   variant="outlined"
                                   value={value}
                                   onChange={onChangeValue}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               {icon}
                                           </InputAdornment>
                                       ),
                                   }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Tipo</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={type}
                                onChange={onChangeType}
                            >
                                <FormControlLabel value={"Profit"} control={<Radio/>} label="Profit"/>
                                <FormControlLabel value={"Loss"} control={<Radio/>} label="Loss"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Repetition</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={repetitions}
                                onChange={handleChange}
                                input={<OutlinedInput label="Repetition" />} >
                                {Repetition.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => {
                            const newValue = value * (type === "Profit"? 1 : -1);
                            modalInfo.handleSubmit({value:newValue, name, repetitions})
                        }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>)

}

export default AddModal;