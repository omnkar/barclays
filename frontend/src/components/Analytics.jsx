import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTable } from "react-table";

// Dummy data for validation analytics
const dummyData = {
  termSheets: 20,
  valid: 15,
  invalid: 5,
  complianceRisk: "Medium",
  errors: [
    { errorType: "Missing Financial Terms", count: 10 },
    { errorType: "Incorrect Clause Formatting", count: 5 },
    { errorType: "Invalid Duration Terms", count: 3 },
  ],
  compliance: {
    compliant: 85,
    nonCompliant: 15,
  },
  riskLevels: [
    { risk: "High", count: 3 },
    { risk: "Medium", count: 7 },
    { risk: "Low", count: 10 },
  ],
  timeline: [
    { date: "March 2025", uploaded: 10 },
    { date: "February 2025", uploaded: 5 },
    { date: "January 2025", uploaded: 5 },
  ],
};

// Custom color palettes
const COLORS = ["#4CAF50", "#F44336"]; // Green for compliant, Red for non-compliant
const RISK_COLORS = {
  High: "#F44336", // Red
  Medium: "#FFC107", // Amber
  Low: "#4CAF50", // Green
};
const TIMELINE_COLOR = "#3F51B5"; // Indigo

const Analytics = () => {
  const [data] = useState(dummyData);

  // Memoizing table columns & data
  const columns = useMemo(
    () => [
      { Header: "Error Type", accessor: "errorType" },
      { Header: "Count", accessor: "count" },
    ],
    []
  );

  const tableData = useMemo(() => data.errors, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  // Create statistics cards data
  const statCards = [
    {
      title: "Total Term Sheets",
      value: data.termSheets,
      icon: "📄",
      color: "#3F51B5",
    },
    {
      title: "Valid Sheets",
      value: data.valid,
      percentage: ((data.valid / data.termSheets) * 100).toFixed(0) + "%",
      icon: "✅",
      color: "#4CAF50",
    },
    {
      title: "Invalid Sheets",
      value: data.invalid,
      percentage: ((data.invalid / data.termSheets) * 100).toFixed(0) + "%",
      icon: "❌",
      color: "#F44336",
    },
    {
      title: "Risk Level",
      value: data.complianceRisk,
      icon: "⚠️",
      color: "#FFC107",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div 
            key={`stat-${index}`} 
            className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            style={{ borderTop: `4px solid ${card.color}` }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 font-medium">{card.title}</h3>
              <span className="text-2xl" role="img" aria-label={card.title}>
                {card.icon}
              </span>
            </div>
            <div className="flex items-end mt-2">
              <span className="text-3xl font-bold text-gray-800">{card.value}</span>
              {card.percentage && (
                <span className="ml-2 text-sm text-gray-500">{card.percentage}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
        {/* Error Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 w">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Validation Errors</h3>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        key={column.id || column.Header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {rows.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr 
                      {...row.getRowProps()} 
                      key={`row-${rowIndex}`}
                      className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          {...cell.getCellProps()}
                          key={`cell-${rowIndex}-${cellIndex}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Metrics - Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Compliance Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Compliant", value: data.compliance.compliant },
                    { name: "Non-Compliant", value: data.compliance.nonCompliant },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: "Compliant", value: data.compliance.compliant },
                    { name: "Non-Compliant", value: data.compliance.nonCompliant },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Level Analytics - Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Risk Level Analytics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.riskLevels}>
                <XAxis dataKey="risk" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" barSize={60}>
                  {data.riskLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.risk]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upload Timeline - Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Upload Timeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeline}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uploaded"
                  stroke={TIMELINE_COLOR}
                  strokeWidth={2}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;