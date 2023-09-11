// statusEmail.js

function OrderStatus(order, user, current) {
  const emailSubject = `Order Status Updates | ${user?.name}`;
  const orderItemsList = order?.orderItems
    .map(
      (item) => `
        <tr>
          <td>
            <img src="${item.image}" alt="${item.name}" style="max-width: 100px; height: auto;" />
          </td>
          <td>
            <p><strong>${item.name}</strong></p>
            <p>Price: &#8377;${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </td>
        </tr>
      `
    )
    .join("");

  let conditionalContent = "";
  if (current === "Booked") {
    conditionalContent = `<p>Your order booked successfully. Reference number - ${order?._id}.</p>`;
  } else {
    conditionalContent = `<p>Your order with reference number ${order?._id} has been updated to ${order?.orderStatus}.</p>`;
  }
  const emailHTML = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          img {
            max-width: 100px;
            height: auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Order Status Update</h1>
          ${conditionalContent}
          
          <p>Order Creation Date: ${new Date(order?.createdAt).toDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
            ${orderItemsList}
          </tbody> 
            
          </table>
          <p>Shipping Price: &#8377;${order?.shippingPrice}</p>
          <p>Tax Price: &#8377;${order?.taxPrice}</p>
          <p>Total Price: &#8377;${order?.totalPrice}</p>
          <p>Order Status: ${order?.orderStatus}</p>
        </div>
      </body>
    </html>
  `;

  return {
    emailSubject,
    emailHTML,
  };
}

export default OrderStatus;

