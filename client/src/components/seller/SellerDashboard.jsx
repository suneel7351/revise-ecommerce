import React from "react";
import DashboardOverview from "./DashboardOverview";
import ProductsList from "./ProductsList";
import AnalyticsChart from "./AnalyticsChat";
// import OrdersList from "./OrdersList";

const sampleProducts = [
    { _id: "1", name: "Product 1", price: 50, Stock: 10 },
    { _id: "2", name: "Product 2", price: 70, Stock: 5 },
    // ... more products
];

const sampleOrders = [
    { _id: "101", orderNumber: "ORD001", total: 150, status: "Shipped" },
    { _id: "102", orderNumber: "ORD002", total: 200, status: "Processing" },
    // ... more orders
];

const sampleAnalyticsData = [1000, 1200, 1500, 1300, 1700, 2000];

const SellerDashboard = () => {
    const editProduct = (productId) => {
        // Implement edit logic
    };

    const deleteProduct = (productId) => {
        // Implement delete logic
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Seller Dashboard</h1>

            <DashboardOverview
                totalProducts={sampleProducts.length}
                totalOrders={sampleOrders.length}
                totalRevenue={sampleOrders.reduce((sum, order) => sum + order.total, 0)}
            />

            <div className="grid grid-cols-2 gap-4 mt-8">
                <ProductsList
                    products={sampleProducts}
                    editProduct={editProduct}
                    deleteProduct={deleteProduct}
                />

                <AnalyticsChart data={sampleAnalyticsData} />
            </div>

            {/* <OrdersList orders={sampleOrders} /> */}
        </div>
    );
};

export default SellerDashboard;
