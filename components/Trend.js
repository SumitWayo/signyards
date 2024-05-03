import React from "react";
const stats = [
  { id: 1, name: "Present in  pincodes in Delhi NCR", value: "200+" },
  { id: 2, name: "Order Complete", value: "800+" },
  { id: 3, name: "Bussiness Partners", value: "14" },
  { id: 4, name: "Total Revenue", value: "10 Crore" }, // New product
];
const Trend = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat, index) => [
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>,
          ])}
        </dl>
      </div>
    </div>
  );
};

export default Trend;
