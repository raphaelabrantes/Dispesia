import React from 'react';
import './App.css';
import {
    Box,
    Button,
    Container,
    Grid
} from "@mui/material";

import AddModal from "./components/AddModal";
import EntryComponent from "./components/EntryComponent";
import CustomGraph from "./components/CustomGraph";



function App() {
    const [entries, setEntries] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const data = React.useMemo(() => {
        let total = 0;
        let months = 6;
        let plotData = new Array(months).fill().map((value, index) => {
            return {
                month: index,
                monthValue: 0,
                total: 0,
            }
        });
        entries.forEach((entry) => {
                const monthValue = entry.value;
                for (let i = 0; i < months; i++) {
                    plotData[i].monthValue += monthValue;
                }
            }
        )
        plotData.forEach((value, index) => {
            total += value.monthValue;
            value.total = total;
        })
        return plotData;
    }, [entries])
    const handleClick = () => {
        setModal(true);
    }

    const handleClose = () => {
        setModal(false);
    }

    const handleSubmit = (entry) => {
        setEntries((prevState) => {
            return [...prevState, entry]
        });
        setModal(false);
    }
    const setEntry = React.useCallback((value, index) => {
        let newValues = [...entries];
        let item = {...newValues[index]};
        item.value = value;
        newValues[index] = item;
        setEntries(newValues);
    }, [setEntries, entries]);

    return (
        <Container maxWidth="sm">
            <Box style={{itemAlign: "center", textAlign: "center"}}>
                <AddModal open={modal} onClose={handleClose} handleSubmit={handleSubmit}></AddModal>
                <Button sx={{mt: 1}} onClick={handleClick}> Add entrie</Button>
                <CustomGraph data={data}></CustomGraph>
                <Grid container spacing={2} sx={{my: 4}}>
                    {
                        entries.map((entry, index) =>  (<EntryComponent key={index} entry={entry} setEntry={setEntry} index={index}/>))
                    }
                </Grid>
            </Box>

        </Container>
    );
}

export default App;
