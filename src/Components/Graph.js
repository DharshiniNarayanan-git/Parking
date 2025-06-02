import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import { MapContext } from "../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SimpleLineChart = () => {
  const { count, setDate, date } = useContext(MapContext);

  const x = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const y = [5, 10, 15, 20, 25, 30, 35, 40, 45];
  const z = count;

  const data = [];

  for (let i = 0; i < x.length; i++) {
    data.push({ x: x[i], y: y[i], AvailableCount: z[i] });
  }

  const navigate = useNavigate();

  return (
    <Container>
      <Grid container mt={5}>
        <Grid item container lg={9} gap={2}>
          <Grid item lg={12}>
            {count.length == 0 && (
              <Typography textAlign={"center"}>
                Data is not available to Selected Date
              </Typography>
            )}
          </Grid>
          <Grid item>
            <LineChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis dataKey="y" />
              <Tooltip />
              <Legend />
              <Line
                type="linear"
                dataKey="AvailableCount"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </Grid>
      </Grid>
      <Grid item container justifyContent={"center"} mt={3}>
        <Button onClick={() => navigate("/home")} variant="outlined">
          Back
        </Button>
      </Grid>
    </Container>
  );
};

export default SimpleLineChart;
