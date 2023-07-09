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
import {Repetitions} from "./components/consts";

function getWeekDayInMonth(year, month, weekDay) {
    const date = new Date(year, month, 1);
    let count = 0;
    while (date.getMonth() === month) {
        if (date.getDay() === weekDay) {
            count++;
        }
        date.setDate(date.getDate() + 1);
    }
    return count;
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
            const currentDate = new Date();
            const monthValue = entry.value;
            for (let i = 0; i < months; i++) {
                if (entry.repetitions.includes(Repetitions.OnceAMonth.toString())) {
                    plotData[i].monthValue += monthValue;
                }
                if (entry.repetitions.includes(Repetitions.EveryMonday.toString())) {
                    const times = getWeekDayInMonth(currentDate.getFullYear(), currentDate.getMonth() + i, 0);
                    plotData[i].monthValue += times * monthValue;
                }
                if (entry.repetitions.includes(Repetitions.EveryTuesday.toString())) {
                    const times = getWeekDayInMonth(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
                    plotData[i].monthValue += times * monthValue;
                }
                if (entry.repetitions.includes(Repetitions.EveryWednesday.toString())) {
                    const times = getWeekDayInMonth(currentDate.getFullYear(), currentDate.getMonth() + i, 2);
                    plotData[i].monthValue += times * monthValue;
                }
                if (entry.repetitions.includes(Repetitions.EveryThursday.toString())) {
                    const times = getWeekDayInMonth(currentDate.getFullYear(), currentDate.getMonth() + i, 3);
                    plotData[i].monthValue += times * monthValue;
                }
                if (entry.repetitions.includes(Repetitions.EveryFriday.toString())) {
                    const times = getWeekDayInMonth(currentDate.getFullYear(), currentDate.getMonth() + i, 4);
                    plotData[i].monthValue += times * monthValue;
                }
                if (entry.repetitions.includes(Repetitions.EverySaturday.toString())) {
                    const times = getWeekDayInMonth(currentDate.getFullYear(), currentDate.getMonth() + i, 5);
                    plotData[i].monthValue += times * monthValue;
                }
                if (entry.repetitions.includes(Repetitions.EverySunday.toString())) {
                    const times = getWeekDayInMonth(currentDate.getFullYear(), currentDate.getMonth() + i, 6);
                    plotData[i].monthValue += times * monthValue;
                } if (entry.repetitions.includes(Repetitions.Daily.toString())) {
                    const times = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate();
                    plotData[i].monthValue += times * monthValue;
                }
            }
        })
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
    const setEntry = React.useCallback((entry, index) => {
        let newValues = [...entries];
        newValues[index] = entry;
        setEntries(newValues);
    }, [setEntries, entries]);

    const removeEntry = React.useCallback((index) => {
        let values = [...entries];
        values.splice(index, 1);
        setEntries(values);
    }, [setEntries, entries])
    return (
        <Container maxWidth="sm">
            <Box style={{itemAlign: "center", textAlign: "center"}}>
                <AddModal open={modal} onClose={handleClose} handleSubmit={handleSubmit}></AddModal>
                <Button sx={{mt: 1}} onClick={handleClick}> Add entrie</Button>
                <CustomGraph data={data}></CustomGraph>
                <Grid container spacing={2} sx={{my: 4}}>
                    {
                        entries.map((entry, index) => (
                            <EntryComponent key={index} entry={entry} setEntry={setEntry} index={index} removeEntry={removeEntry} />))
                    }
                </Grid>
            </Box>

        </Container>
    );
}

export default App;
