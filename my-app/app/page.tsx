"use client";

import { getRandomGreenColor } from "@/utils/getRandomGreenColor";
import { useEffect, useState, useRef } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import GridSquares from "./components/GridSquares";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const GREEN_COLORS = ["#161B22", "#0D4429", "#016D32", "#27A641", "#3AD353"];

export default function Home() {
  const numRows = 7;
  const numCols = 54;
  const totalSquares = numRows * numCols;

  //Change the finalCount here
  const finalCount = 1098;

  const [colors, setColors] = useState(Array(totalSquares).fill("#161B22"));
  const [counter, setCounter] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let squaresFilled = 0;

    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        const index = row * numCols + col;
        const timer = setTimeout(() => {
          setColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = getRandomGreenColor(GREEN_COLORS);
            return newColors;
          });

          squaresFilled++;
          setCounter(Math.round((squaresFilled / totalSquares) * finalCount));
        }, col * 100 + row * 10);

        timersRef.current.push(timer);
      }
    }

    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, [finalCount, numCols, numRows, setCounter, setColors, totalSquares]);

  return (
    <main className="h-screen grid place-content-center px-20">
      <div className="flex justify-between mb-2">
        <strong className="text-lg">{counter} contributions in 2024</strong>
        <div className="flex items-center">
          <p>Contribution settings</p>
          <RiArrowDownSFill />
        </div>
      </div>

      <div className="rounded-md border border-[#3D444D] p-6 flex items-center gap-2">
        <div className="flex flex-col pb-4 gap-2">
          <p>Mon</p>
          <p>Wed</p>
          <p>Fri</p>
        </div>
        <div>
          <div className="flex justify-between gap-4 font-semibold pr-12">
            {MONTHS.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>

          <GridSquares colors={colors} numCols={numCols} numRows={numRows} />

          <div className="flex mt-2 justify-between">
            <p>Learn how we count contributions</p>
            <div className="flex items-center gap-2">
              <p>Less</p>
              <div className="flex gap-1">
                {GREEN_COLORS.map((color) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-3 rounded-sm h-3"
                  />
                ))}
              </div>
              <p>More</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
