import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { getnoOfOrderWithStatus } from "../../redux/seller/product";
import { useDispatch } from "react-redux";

function OrderStatusDoughnutChart({ data }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getnoOfOrderWithStatus())
  }, [])
  return (
    <div className=" rounded-lg shadow-sm hover:shadow-md bg-white p-4 border border-gray-100">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
        width={400}
        height={400}
      />
    </div>
  );
}

export default OrderStatusDoughnutChart;
