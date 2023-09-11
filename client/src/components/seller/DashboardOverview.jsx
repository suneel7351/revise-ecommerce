import React from "react";

const DashboardOverview = ({ totalProducts, totalOrders, totalRevenue }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-2 border border-gray-200 rounded">
                    <p>Total Products</p>
                    <span className="text-xl font-bold">{totalProducts}</span>
                </div>
                <div className="p-2 border border-gray-200 rounded">
                    <p>Total Orders</p>
                    <span className="text-xl font-bold">{totalOrders}</span>
                </div>
                <div className="p-2 border border-gray-200 rounded">
                    <p>Total Revenue</p>
                    <span className="text-xl font-bold">&#8377; {totalRevenue}</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
