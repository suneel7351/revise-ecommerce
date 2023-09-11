import React, { useEffect ,useState} from "react";
import { Bar } from "react-chartjs-2";

import { useDispatch } from "react-redux";
import { getYearWiseIncomeExpenses } from "../../redux/seller/product";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function SalesExpensesGraph({ data }) {
    const dispatch = useDispatch()
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [yearIncExpState, setyearIncExpState] = useState(currentYear)
    const options = {
        indexAxis: "x", // Display months on the x-axis
        scales: {
            y: {
                beginAtZero: true,
                type:"linear"
            },
        },
    };

    useEffect(() => {
        dispatch(getYearWiseIncomeExpenses(yearIncExpState))
    }, [yearIncExpState])


    const yearOptions = [];

    for (let i = currentYear; i > currentYear - 5; i--) {
        yearOptions.push({ value: i, label: i.toString() });
    }

    return (
        <div className="rounded-lg shadow-sm hover:shadow-md bg-white p-4 border border-gray-100 w-[90%] ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Income and Expenses</h2>
                <div className="w-48">
                    <select value={yearIncExpState} className="border w-full border-gray-100 shadow-sm hover:shadow-md px-4 py-2" onChange={(e) => setyearIncExpState(e.target.value)}>
                        <option>Select Year</option>
                        {yearOptions.map((item) => (
                            <option key={item.value} value={item.label}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="relative h-48 ">
                <Bar
                    data={data}
                    options={{
                        ...options,
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    usePointStyle: true, // Display circular labels
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default SalesExpensesGraph;
