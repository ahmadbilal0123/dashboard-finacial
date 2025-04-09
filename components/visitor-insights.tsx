"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { useFinance } from "@/context/finance-context"

export function VisitorInsights() {
  const { visitorData } = useFinance()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={visitorData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="newVisitors"
          name="New Visitors"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 0 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="returningVisitors"
          name="Returning Visitors"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={{ r: 0 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="uniqueVisitors"
          name="Unique Visitors"
          stroke="#ffc658"
          strokeWidth={2}
          dot={{ r: 0 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
