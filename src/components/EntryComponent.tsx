import React from "react";
import {Grid, IconButton, Typography, Tooltip} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {Entry} from "./consts";
import AddModal from "./AddModal";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';


type EntryComponentProps = {
    entry: Entry,
    index: number,
    setEntry(entry: Entry, index: number): void,
    removeEntry(index: number): void,

}
const EntryComponent = ({entry, setEntry, index, removeEntry}: EntryComponentProps) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const repetitions = entry.repetitions.map(value => value.replace("Every", "")).join(", ");

    const handleChange = React.useCallback((
        entry: Entry,
    ) => {
        setEntry(entry, index);
        setIsEdit(false);

    }, [setEntry, index])
    const handleRemove = () => {
        removeEntry(index);
    }

    const handleClose = () => {
        setIsEdit(false);
    }
    return (
        <Tooltip title={repetitions} disableHoverListener={isEdit}>
            <Grid item xs={6}>
                <AddModal open={isEdit} onClose={handleClose} handleSubmit={handleChange} entry={entry}/>
                <Grid container style={{backgroundColor: 'darkgrey', borderRadius: '15px', alignItems: 'center'}}>
                    <Grid item xs={3}>
                        {entry.name + ":"}
                    </Grid>
                    <Grid item xs={5}>
                        {entry.value}
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => {
                            setIsEdit(true);
                        }}>
                            <EditTwoToneIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={handleRemove}>
                            <ClearIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Tooltip>
    )
}

export default EntryComponent;