import React, { useEffect, useState } from "react";
import { Music } from "../entities/Music";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const Diagram = () => {
  const [statsArray, setStatsArray] = useState<number[]>([0, 0, 0, 0, 0]);
  useEffect(() => {
    axios
      .get(
        "https://mpp-marci-spring-app-20240517184709.azuremicroservices.io/music",
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        }
      )
      .then((response) => {
        const musicArray: Music[] = response.data; //checking if connection with server is still okay
        const newStats: number[] = [0, 0, 0, 0, 0];
        musicArray.forEach((music: Music) => {
          newStats[music.rating - 1]++;
        });

        setStatsArray(newStats);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      <h1>Rating status</h1>
      <BarChart
        series={[{ data: statsArray }]}
        xAxis={[
          {
            data: ["Star 1", "Star 2", "Star 3", "Star 4", "Star 5"],
            scaleType: "band",
          },
        ]}
        width={500}
        height={300}
      ></BarChart>
    </>
  );
};

export default Diagram;
