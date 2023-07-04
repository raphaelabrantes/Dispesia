import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

const CustomGraph = ({data}) => {
    return (
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
    )
};
export default CustomGraph;