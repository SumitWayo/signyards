import React from "react";
const stats = [
  {
    id: 1,
    name: "SKUs of Products & Services across different categories on our Marketplace.",
    value: "50+",
  },
  {
    id: 2,
    name: "Sellers or Seller partners are registered on signyards across categories",
    value: "20+",
  },
  { id: 3, name: "Registers user or Buyers or clients.", value: "50+" },
  {
    id: 4,
    name: "Turnkey Signages & Advertising Projects Completed or delivered for different clients across India.",
    value: "50+",
  }, // New product
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
              <dt className="text-base leading-7 font-semibold text-gray-800">
                {stat.name}
              </dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
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
