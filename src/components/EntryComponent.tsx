import React from "react";
import {Grid, IconButton, Typography} from "@mui/material";
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

    const handleChange = React.useCallback((
        entry: Entry,
    ) => {
        setEntry(entry, index);
        setIsEdit(false);

    }, [setEntry, index])
    const handleRemove = ()  => {
        removeEntry(index);
    }

    const handleClose = () => {
        setIsEdit(false);
    }
    return (
        <Grid item xs={6}>
            <AddModal open={isEdit} onClose={handleClose} handleSubmit={handleChange} entry={entry}/>
            <Typography variant="h5" display="block" gutterBottom>
                <IconButton onClick={handleRemove}>
                    <ClearIcon></ClearIcon>
                </IconButton>
                <IconButton onClick={() => {
                    setIsEdit(true);
                }}>
                    <EditTwoToneIcon/>
                </IconButton>
                {entry.name}:{entry.value}
            </Typography>
            {entry.repetitions}
        </Grid>
    )
}

export default EntryComponent;