import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "1 Custom Profile Page",
      "Basic Analytics",
      "Limited Digital Product Sales",
      "Community Support"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    features: [
      "5 Custom Profile Pages",
      "Advanced Analytics",
      "Unlimited Digital Product Sales",
      "Priority Support",
      "Custom Domain"
    ]
  },
  {
    name: "Business",
    price: "$49",
    features: [
      "Unlimited Custom Profile Pages",
      "Premium Analytics",
      "Unlimited Digital Product Sales",
      "24/7 Priority Support",
      "Custom Domain",
      "White-label Solution"
    ]
  }
]

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={index === 1 ? "border-blue-500 border-2" : ""}>
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-4xl font-bold">{plan.price}<span className="text-sm font-normal">/month</span></CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{index === 0 ? "Get Started" : "Upgrade Now"}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


