import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function AdminDashboard() {

  return (
    <div className="admin-container " style={{ height: "calc(100vh - 73px)" }}>
      <div className="md:px-6 px-4  border-r border-gray-100 bg-white">
        <Sidebar  />
      </div>
      <div className={` main-container bg-gray-50 w-[99%] py-6` }>

      <h1 className="text-2xl text-center">Work in progress</h1>
        {/* <div>
          <h1 className="font-bold text-xl mb-4">Overview</h1>
          <div className="flex gap-6 flex-wrap">
            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
           lorem32
              </div>
              <span className="font-bold text-orange-700">fdsfkls</span>
              <span className="text-gray-500">Total Products</span>
            </div>
            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
             kljfldsfs
              </div>
              <span className="font-bold text-orange-700">fdsfsfsf</span>
              <span className="text-gray-500">Total Income</span>
            </div>
            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
             fkdlfjf sfjls
              </div>
              <span className="font-bold text-orange-700">09t4ipkfor</span>
              <span className="text-gray-500">Total Expenses</span>
            </div>

            <div className="border bg-white w-[200px] border-gray-50 hover:shadow-md shadow-sm flex flex-col gap-2 p-4">
              <div className="flex justify-between gap-4">
          klfs34

              </div>
              <span className="font-bold text-orange-700">fjslkj43</span>
              <span className="text-gray-500">Total Orders</span>
            </div>
          </div>
        </div> */}
    
        <div className="mt-12">
          {/* <RevenueTrendChart data={revenueData} /> */}
        </div>
        <div className="mt-12 flex gap-8 flex-wrap md:flex-nowrap">
          <div className="w-[40%] rounded-lg shadow-sm hover:shadow-md bg-white p-4 border border-gray-100">
            {/* <Doughnut
              data={pieChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
              width={400}
              height={400}
            /> */}
          </div>
          <div className="w-[40%]">
            {/* <OrderStatusDoughnutChart data={orderStatusData} className="" /> */}
          </div>
        </div>
      
        <div className="mt-12 ">
          {/* <TopViewedProducts products={topViewedProducts} /> */}
        </div>



      </div>
    </div>
  );
}

export default AdminDashboard;
