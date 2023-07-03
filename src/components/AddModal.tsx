import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    Box, Button,
    FormControl,
    FormControlLabel,
    FormLabel, Grid,
    InputAdornment,
    Modal, Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {ModalInfo} from "./consts";


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
    const [value, setValue] = React.useState(1000);
    const [type, setType] = React.useState("Gasto");
    const [name, setName] = React.useState("");

    const onChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType((event.target as HTMLInputElement).value);
    }

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt((event.target as HTMLInputElement).value));
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName((event.target as HTMLInputElement).value);

    }

    const icon = type === "Lucro" ? (<AddIcon></AddIcon>) : (<RemoveIcon></RemoveIcon>);
    return (
        <Modal
            open={modalInfo.open}
            onClose={modalInfo.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={2} sx={{my: 4}}>
                    <Grid item xs={12}>
                        Hello
                    </Grid>
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
                                <FormControlLabel value={"Lucro"} control={<Radio/>} label="Lucro"/>
                                <FormControlLabel value={"Gasto"} control={<Radio/>} label="Gasto"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => {
                            const newValue = value * (type === "Lucro"? 1 : -1);
                            modalInfo.handleSubmit({value, name})
                            setName("");
                            setType("Gasto");
                            setValue(1000);
                        }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>)

}

export default AddModal;