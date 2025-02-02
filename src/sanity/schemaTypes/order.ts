const order = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "zipCode",
      title: "Zip Code",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },{
      name: "discount",
      title: "Discount",
      type: "number",
    },
    {
      name: "orderDate",
      title: "orderDate",
      type: "string",
    },
    {
      name: "cartItems",
      title: "CartItems",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
    },
    {
      name: "total",
      title: "Total",
      type: "number",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Shipped", value: "shipped" },
          { title: "Processing", value: "processing" },
        ],
        layout:"radio"
      },
      initialvalue:"pending"
    },
  ],
};
export default order;
