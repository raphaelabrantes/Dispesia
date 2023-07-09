import React from "react";
import {Grid, IconButton, Slider, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {Entry} from "./consts";

type EntryComponentProps = {
    entry: Entry,
    index: number,
    setEntry(value: number | number[], index: number): void,
    removeEntry(index: number): void,

}
const EntryComponent = ({entry, setEntry, index, removeEntry}: EntryComponentProps) => {
    const handleChange = React.useCallback((
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        setEntry(newValue, index);

    }, [setEntry, index])

    const handleRemove = ()  => {
        removeEntry(index);
    }
    return (
        <Grid item xs={6}>
            <Typography variant="h5" display="block" gutterBottom onClick={handleRemove}>
                <IconButton>
                    <ClearIcon></ClearIcon>
                </IconButton>
                {entry.name}:{entry.value}
            </Typography>
            {entry.repetitions}
        </Grid>
    )
}

export default EntryComponent;