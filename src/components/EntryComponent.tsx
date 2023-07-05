import React from "react";
import {Grid, Slider, Typography} from "@mui/material";
import {Entry} from "./consts";

type EntryComponentProps = {
    entry: Entry,
    index: number,
    setEntry(value: number | number[], index: number): void,

}
const EntryComponent = ({entry, setEntry, index} : EntryComponentProps) => {
    const handleChange = React.useCallback((
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
       setEntry(newValue, index);

    }, [setEntry, index])
    return (
        <Grid item xs={6}>
            <Typography variant="h5" display="block" gutterBottom>
                {entry.name}:{entry.value}
            </Typography>
            <Slider
                getAriaLabel={() => 'index' + index}
                value={entry.value}
                valueLabelDisplay="auto"
                max={10000}
                min={-10000}
                onChange={handleChange}
            />
            {entry.repetitions}
        </Grid>
    )
}

export default EntryComponent;