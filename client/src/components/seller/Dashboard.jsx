import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./seller.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SalesExpensesGraph from "./SalesExpensesGraph";
import { FaProductHunt } from "react-icons/fa";
import RevenueTrendChart from "./RevenueTrendChart";
import { Doughnut } from "react-chartjs-2";
import SalesChart from "./SalesChart";
import OrderStatusDoughnutChart from "./OrderStatusDoughnutChart";
import TopViewedProducts from "./TopViewedProudcts";
import io from 'socket.io-client'
import { useDispatch, useSelector } from "react-redux";
import { countStock, getAllCountProduct, getOverAllIncomeExpenses, getYearWiseIncomeExpenses } from "../../redux/seller/product";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import { getSellerAllOrders } from "../../redux/seller/order";
const socket = io("http://localhost:9889")
function Dashboard() {
  const { productsCount, yearIncExp, incExp, yearRevenue, processingCount, shippedCount, deliveredCount,inStock,outOfStock } = useSelector(state => state.sellerProduct)
  const { orders } = useSelector(state => state.sellerOrder)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCountProduct())
    dispatch(getSellerAllOrders())
    dispatch(getOverAllIncomeExpenses())
    dispatch(countStock())
  }, [])




  const pieChartData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [inStock&&inStock, outOfStock&&outOfStock],
        backgroundColor: ["#34D399", "#F87171"], // Colors for the segments
      },
    ],
  };


  const revenueData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Revenue Trend",
        data: yearRevenue?.map((item) => item.revenue),
        backgroundColor: "rgba(252, 66, 123, 0.2)",
        borderColor: "#FC427B",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#FC427B",
      },
    ],
  };


  const topViewedProducts = [
    {
      id: 1,
      name: "Smartphone X",
      category: "Electronics",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_640.jpg",
      viewCount: 1000,
    },
    {
      id: 2,
      name: "Laptop Y",
      category: "Electronics",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_640.jpg",
      viewCount: 800,
    },
    {
      id: 3,
      name: "Running Shoes Z",
      category: "Sports",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_640.jpg",
      viewCount: 700,
    },
    {
      id: 4,
      name: "Camera A",
      category: "Electronics",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_640.jpg",
      viewCount: 650,
    },
    {
      id: 5,
      name: "Headphones B",
      category: "Electronics",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_640.jpg",
      viewCount: 600,
    },
  ];

  const graphData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Income",
        data: yearIncExp?.map((item) => item.income),
        backgroundColor: "#FC427B",
        barPercentage: 0.8, // Adjust the bar width
        categoryPercentage: 0.6,
      },
      {
        label: "Expenses",
        data: yearIncExp?.map((item) => item.expenses),
        backgroundColor: "#82589F",
        barPercentage: 0.8, // Adjust the bar width
        categoryPercentage: 0.6,
      },
    ],
  };

  const orderStatusData = {
    labels: ["Processing", "Shipped", "Delivered"],
    datasets: [
      {
        data: [processingCount && processingCount, shippedCount && shippedCount, deliveredCount && deliveredCount], // Replace with your actual data
        backgroundColor: ["#FF5733", "#36A2EB", "#66BB6A"], // Colors for the segments
      },
    ],
  };



  return (
    <div className="admin-container " style={{ height: "calc(100vh - 73px)" }}>
      <div className="md:px-6 px-4  border-r border-gray-100 bg-white">
        <Sidebar  />
      </div>
      <div className={` main-container bg-gray-50 w-[99%] py-6` }>
        <div>
          <h1 className="font-bold text-xl mb-4">Overview</h1>
          <div className="flex gap-6 flex-wrap">
            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
                {" "}
                <FaProductHunt className="text-orange-500" />
                <AddIcon />
              </div>
              <span className="font-bold text-orange-700">{productsCount && productsCount}</span>
              <span className="text-gray-500">Total Products</span>
            </div>
            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
                {" "}
                <ShoppingBagIcon className="text-orange-500" />
                <CurrencyRupeeIcon />
              </div>
              <span className="font-bold text-orange-700">{incExp?.income}</span>
              <span className="text-gray-500">Total Income</span>
            </div>
            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
                {" "}
                <DataSaverOffIcon className="text-orange-500" />
                <CurrencyRupeeIcon />
              </div>
              <span className="font-bold text-orange-700">{incExp?.expenses}</span>
              <span className="text-gray-500">Total Expenses</span>
            </div>

            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
                {" "}
                <ShoppingCartIcon className="text-orange-500" />
                <AddIcon />
              </div>
              <span className="font-bold text-orange-700">{orders?.length}</span>
              <span className="text-gray-500">Total Orders</span>
            </div>
          </div>
        </div>
      {
        graphData &&   <div className="mt-12">
          <SalesExpensesGraph data={graphData} />
        </div>
      }
        <div className="mt-12">
          <RevenueTrendChart data={revenueData} />
        </div>
        <div className="mt-12 flex gap-8 flex-wrap md:flex-nowrap">
          <div className="w-[40%] rounded-lg shadow-sm hover:shadow-md bg-white p-4 border border-gray-100">
            <Doughnut
              data={pieChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
              width={400}
              height={400}
            />
          </div>
          <div className="w-[40%]">
            <OrderStatusDoughnutChart data={orderStatusData} className="" />
          </div>
        </div>
      
        <div className="mt-12 ">
          <TopViewedProducts products={topViewedProducts} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
