import React from "react";
import { Bar } from "react-chartjs-2";

function TopProductsHorizontalGraph({ topProducts }) {
    const data = {
        labels: topProducts.map(product => product.name),
        datasets: [
            {
                label: "Profit",
                data: topProducts.map(product => product.profit),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
            },
        ],
    };

    const options = {
        indexAxis: "y", // Display bars horizontally
        scales: {
            x: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="rounded-lg shadow-md bg-white p-4 border border-gray-100">
            <h2 className="text-lg font-semibold mb-2">Top Profitable Products</h2>
            <div className="relative h-48">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default TopProductsHorizontalGraph;
