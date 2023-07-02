import React from 'react';
import './App.css';
import {
    Box,
    Button,
    Container,
    Grid,

    TextField
} from "@mui/material";

import AddModal from "./components/AddModal";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


const EntryComponent = ({entry}) => {
    const {name, value} = entry;
    return (
        <Grid item xs={6}>
            <TextField id="outlined-basic" label={name} variant="outlined" value={value}></TextField>
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
                const monthValue = parseInt(entry.value) *  (entry.positive ? 1: -1);
                for (let i = 0; i < months; i++) {
                    plotData[i].monthValue += monthValue;
                }
            }
        )
        plotData.forEach((value, index) => {
            total += value.monthValue;
            value.total = total;
        })
        console.log(plotData)
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
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="monthValue" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="total" stroke="#505050" activeDot={{r: 8}}/>
                </LineChart>

                <Grid container spacing={2} sx={{my: 4}}>
                    {
                        entries.map((entry, index) => {
                            return <EntryComponent key={index} entry={entry}/>
                        })
                    }
                </Grid>
            </Box>

        </Container>
    );
}

export default App;
