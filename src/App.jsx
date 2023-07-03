import React from 'react';
import './App.css';
import {
    Box,
    Button,
    Container,
    Grid, Slider,
    Typography
} from "@mui/material";

import AddModal from "./components/AddModal";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";


const EntryComponent = ({entry, setEntry, index}) => {
    const handleChange = React.useCallback((
        event,
        newValue,
        activeThumb,
    ) => {
        setEntry(parseInt(newValue), index);

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
        </Grid>
    )
}


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
                <LineChart
                    width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="monthValue" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="total" stroke="#505050" activeDot={{r: 8}}/>
                </LineChart>

                <Grid container spacing={2} sx={{my: 4}}>
                    {
                        entries.map((entry, index) => {
                            return (<EntryComponent key={index} entry={entry} setEntry={setEntry} index={index}/>)
                        })
                    }
                </Grid>
            </Box>

        </Container>
    );
}

export default App;
