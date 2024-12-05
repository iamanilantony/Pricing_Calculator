'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function PricingCalculator() {
  const [service, setService] = useState('')
  const [people, setPeople] = useState(1)
  const [hours, setHours] = useState(1)
  const [frequency, setFrequency] = useState(1)
  const [total, setTotal] = useState(0)

  const calculateTotal = () => {
    // This is a placeholder calculation. You should replace this with your actual pricing logic.
    const baseRate = 100 // Base rate per hour
    const serviceFactor = service === 'liveevent' ? 1.5 : 1 // Live events cost 50% more
    const calculatedTotal = baseRate * people * hours * frequency * serviceFactor
    setTotal(calculatedTotal)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Media Production Pricing Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="service">Service Type</Label>
          <Select onValueChange={setService}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="podcast">Podcast Production</SelectItem>
              <SelectItem value="highlight">Highlight Reel</SelectItem>
              <SelectItem value="liveevent">Live Event Coverage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="people">Number of People Required</Label>
          <Slider
            id="people"
            min={1}
            max={10}
            step={1}
            value={[people]}
            onValueChange={(value) => setPeople(value[0])}
          />
          <div className="text-right">{people} people</div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hours">Number of Hours</Label>
          <Slider
            id="hours"
            min={1}
            max={24}
            step={1}
            value={[hours]}
            onValueChange={(value) => setHours(value[0])}
          />
          <div className="text-right">{hours} hours</div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency of Service</Label>
          <Input
            id="frequency"
            type="number"
            min={1}
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value) || 1)}
          />
        </div>

        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-semibold mb-2">Additional Information</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Live event coverage may incur additional costs for equipment rental.</li>
            <li>For projects longer than 8 hours, we offer a 10% discount.</li>
            <li>Weekend rates may be higher. Please contact us for specific quotes.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <Button onClick={calculateTotal} className="w-full">Calculate Total</Button>
        {total > 0 && (
          <div className="text-xl font-bold">
            Estimated Total: ${total.toFixed(2)}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

