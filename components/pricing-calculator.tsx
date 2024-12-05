'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface Service {
  id: number
  type: string
  people: number
  hours: number
  frequency: number
}

export default function PricingCalculator() {
  const [services, setServices] = useState<Service[]>([
    { id: Date.now(), type: '', people: 1, hours: 1, frequency: 1 },
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateService = (id: number, field: keyof Service, value: any) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    )
  }

  const calculateTotal = (service: Service): number => {
    const baseRate = 100
    const serviceFactor = service.type === 'liveevent' ? 1.5 : 1
    const calculatedTotal = baseRate * service.people * service.hours * service.frequency * serviceFactor
    const discount = service.hours > 8 ? 0.1 : 0
    return calculatedTotal * (1 - discount)
  }

  const grandTotal = services.reduce((sum, service) => sum + calculateTotal(service), 0)

  const addService = () => {
    setServices([
      ...services,
      { id: Date.now(), type: '', people: 1, hours: 1, frequency: 1 },
    ])
  }

  const deleteService = (id: number) => {
    if (services.length > 1) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto my-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">PulseFrame Studios Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {services.map((service, index) => (
          <div key={service.id} className="space-y-4 border-b pb-4 relative">
            <h3 className="font-semibold text-lg">Service #{index + 1}</h3>

            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => deleteService(service.id)} 
              className="absolute top-0 right-0"
              disabled={services.length === 1}
            >
              Delete
            </Button>

            <div className="space-y-2">
              <Label htmlFor={`service-${service.id}`}>Service Type</Label>
              <Select onValueChange={(value) => updateService(service.id, 'type', value)}>
                <SelectTrigger id={`service-${service.id}`}>
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
              <Label htmlFor={`people-${service.id}`}>Number of People Required</Label>
              <Slider
                id={`people-${service.id}`}
                min={1}
                max={10}
                step={1}
                value={[service.people]}
                onValueChange={(value) => updateService(service.id, 'people', value[0])}
              />
              <div className="text-right">{service.people} people</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`hours-${service.id}`}>Number of Hours</Label>
              <Slider
                id={`hours-${service.id}`}
                min={1}
                max={24}
                step={1}
                value={[service.hours]}
                onValueChange={(value) => updateService(service.id, 'hours', value[0])}
              />
              <div className="text-right">{service.hours} hours</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`frequency-${service.id}`}>Frequency of Service</Label>
              <Input
                id={`frequency-${service.id}`}
                type="number"
                min={1}
                value={service.frequency}
                onChange={(e) => updateService(service.id, 'frequency', parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="text-right font-semibold">
              Service Total: ${calculateTotal(service).toFixed(2)}
            </div>
          </div>
        ))}

        <Button onClick={addService} className="w-full mt-4">Add Another Service</Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <div className="text-xl font-bold">
          Grand Total: ${grandTotal.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  )
}
