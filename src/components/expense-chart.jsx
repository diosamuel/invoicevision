"use client"

import { Line, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for today's expenses by hour
const hourlyExpenseData = [
  { hour: "00:00", amount: 0 },
  { hour: "01:00", amount: 0 },
  { hour: "02:00", amount: 0 },
  { hour: "03:00", amount: 0 },
  { hour: "04:00", amount: 0 },
  { hour: "05:00", amount: 0 },
  { hour: "06:00", amount: 0 },
  { hour: "07:00", amount: 0 },
  { hour: "08:00", amount: 150 },
  { hour: "09:00", amount: 350 },
  { hour: "10:00", amount: 1200 },
  { hour: "11:00", amount: 450 },
  { hour: "12:00", amount: 750 },
  { hour: "13:00", amount: 250 },
  { hour: "14:00", amount: 4914 },
  { hour: "15:00", amount: 0 },
  { hour: "16:00", amount: 0 },
  { hour: "17:00", amount: 0 },
  { hour: "18:00", amount: 0 },
  { hour: "19:00", amount: 0 },
  { hour: "20:00", amount: 0 },
  { hour: "21:00", amount: 0 },
  { hour: "22:00", amount: 0 },
  { hour: "23:00", amount: 0 },
]

export default function ExpenseChart() {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="aspect-[4/2]"
    >
      <Line
        data={hourlyExpenseData}
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 20,
        }}
        accessibilityLayer
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => value.split(":")[0]}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          content={<ChartTooltipContent indicator="line" formatValue={(value) => `$${value.toLocaleString()}`} />}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </Line>
    </ChartContainer>
  )
}

