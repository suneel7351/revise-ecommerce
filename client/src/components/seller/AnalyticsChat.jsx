import React from "react";
import { Line } from "react-chartjs-2";

const AnalyticsChart = ({ data }) => {
    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Monthly Revenue",
                data: data,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 mt-4">
            <h2 className="text-lg font-semibold mb-2">Analytics and Insights</h2>
            <Line data={chartData} />
        </div>
    );
};

export default AnalyticsChart;
