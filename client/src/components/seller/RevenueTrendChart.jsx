import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getYearWiseIncomeExpenses } from "../../redux/seller/product";

function RevenueTrendChart({ data }) {
  const dispatch = useDispatch()
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [yearIncExpState, setyearIncExpState] = useState(currentYear)
  useEffect(() => {
    dispatch(getYearWiseIncomeExpenses(yearIncExpState))
  }, [yearIncExpState])


  const yearOptions = [];

  for (let i = currentYear; i > currentYear - 5; i--) {
    yearOptions.push({ value: i, label: i.toString() });
  }
  return (
    <div className="rounded-lg shadow-sm hover:shadow-md bg-white p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Revenue Trend Over Time</h2>
        <div className="w-48">
          <select value={yearIncExpState} onChange={(e) => setyearIncExpState(e.target.value)} className="border w-full border-gray-100 shadow-sm hover:shadow-md px-4 py-2">
            <option>Select Year</option>
            {yearOptions.map((item) => (
              <option key={item.value} value={item.label}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-[400px]">
        <Line
          data={data}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Revenue ($)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Months",
                },
              },
            },
          }}
          height={400}
        />
      </div>
    </div>
  );
}

export default RevenueTrendChart;
