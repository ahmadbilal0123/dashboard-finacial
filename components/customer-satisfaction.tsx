"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useFinance } from "@/context/finance-context"

export function CustomerSatisfaction() {
  const { customerSatisfaction } = useFinance()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={customerSatisfaction}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip formatter={(value) => [`${value}%`, "Satisfaction"]} labelFormatter={(label) => `Month: ${label}`} />
        <Line
          type="monotone"
          dataKey="satisfaction"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
