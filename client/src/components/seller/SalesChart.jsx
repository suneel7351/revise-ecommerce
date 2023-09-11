import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";

function SalesChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Sample sales data for demonstration
    const sampleSalesData = [
      { date: "2023-08-01", sales: 120 },
      { date: "2023-08-02", sales: 150 },
      { date: "2023-08-03", sales: 200 },
      { date: "2023-08-04", sales: 180 },
      { date: "2023-08-05", sales: 250 },
      // ... more data ...
    ];

    // Filter sales data based on selected year and month
    const filteredData = sampleSalesData.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getFullYear() === selectedYear &&
        date.getMonth() + 1 === selectedMonth
      );
    });

    setSalesData(filteredData);
  }, [selectedYear, selectedMonth]);

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: `Sales in ${selectedMonth}/${selectedYear}`,
        data: days.map((day) => {
          const matchingSale = salesData.find(
            (item) => new Date(item.date).getDate() === day
          );
          return matchingSale ? matchingSale.sales : 0;
        }),
        backgroundColor: "#FC427B",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales",
        },
      },
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
    },
  };

  return (
    <div className="rounded-lg shadow-sm hover:shadow-md bg-white p-4 border border-gray-100">
      <h2>Sales Chart</h2>
      <div className="flex gap-4 mt-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-100 shadow py-2 px-4"
        >
          {Array.from({ length: 3 }, (_, i) => selectedYear - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-100 shadow py-2 px-4"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(selectedYear, month - 1).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <div className="my-4">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default SalesChart;
