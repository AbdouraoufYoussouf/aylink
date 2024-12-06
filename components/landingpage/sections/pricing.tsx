"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle, ArrowRight } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const tiers = [
  {
    name: "Free",
    description: "Parfait pour débuter",
    monthlyPrice: "0",
    yearlyPrice: "0",
    features: [
      {
        name: "1 Custom Profile Page",
        included: true,
        tooltip: "Créez votre première page de profil personnalisée"
      },
      {
        name: "Basic Analytics",
        included: true,
        tooltip: "Suivez les statistiques de base de votre page"
      },
      {
        name: "Up to 5 Public Links",
        included: true,
        tooltip: "Ajoutez jusqu'à 5 liens publics sur votre profil"
      },
      {
        name: "Community Support",
        included: true,
        tooltip: "Accès au support communautaire"
      },
      {
        name: "Custom Domain",
        included: false,
        tooltip: "Utilisez votre propre nom de domaine"
      }
    ]
  },
  {
    name: "Pro",
    description: "Pour les créateurs actifs",
    monthlyPrice: "29",
    yearlyPrice: "14.50",
    popular: true,
    features: [
      {
        name: "5 Custom Profile Pages",
        included: true,
        tooltip: "Créez jusqu'à 5 pages de profil personnalisées"
      },
      {
        name: "Advanced Analytics",
        included: true,
        tooltip: "Analyses détaillées de vos performances"
      },
      {
        name: "Unlimited Links",
        included: true,
        tooltip: "Ajoutez autant de liens que vous voulez"
      },
      {
        name: "Priority Support",
        included: true,
        tooltip: "Support prioritaire par email"
      },
      {
        name: "Custom Domain",
        included: true,
        tooltip: "Utilisez votre propre nom de domaine"
      },
      {
        name: "Course Platform Access",
        included: true,
        tooltip: "Accès à la plateforme de cours en ligne"
      }
    ]
  },
  {
    name: "Business",
    description: "Solution entreprise complète",
    monthlyPrice: "99",
    yearlyPrice: "49.50",
    features: [
      {
        name: "Unlimited Profile Pages",
        included: true,
        tooltip: "Créez un nombre illimité de pages"
      },
      {
        name: "Enterprise Analytics",
        included: true,
        tooltip: "Analyses avancées pour entreprises"
      },
      {
        name: "Team Management",
        included: true,
        tooltip: "Gérez votre équipe et les accès"
      },
      {
        name: "API Access",
        included: true,
        tooltip: "Accès complet à notre API"
      },
      {
        name: "White Label Solution",
        included: true,
        tooltip: "Personnalisation complète de l'interface"
      },
      {
        name: "Dedicated Support",
        included: true,
        tooltip: "Support dédié 24/7"
      }
    ]
  }
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id={'pricing'} className="py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold tracking-tight">
              <span className="text-purple-600">Prix transparent,</span>
              <br />
              <span className="text-gray-900">Sans surprises.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Commencez gratuitement, sans carte bancaire requise.
            </p>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Mensuel</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className={`text-sm ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Annuel
              <span className="ml-1.5 inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
                -50%
              </span>
            </span>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <TooltipProvider>
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 ${
                  tier.popular ? 'scale-105 ring-2 ring-purple-600' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-purple-600 px-3 py-2 text-sm font-medium text-white text-center">
                    Plus populaire
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900">{tier.name}</h3>
                  <p className="mt-2 text-gray-500">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-base font-medium text-gray-500">/mois</span>
                  </p>

                  <Button 
                    className="mt-8 w-full bg-gray-900 hover:bg-gray-800 text-white group"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    Commencer
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="border-t border-gray-100 px-8 py-8">
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature.name} className="flex items-start">
                        <div className="flex-shrink-0">
                          {feature.included ? (
                            <Check className="h-6 w-6 text-purple-600" />
                          ) : (
                            <Check className="h-6 w-6 text-gray-300" />
                          )}
                        </div>
                        <span className="ml-3 text-sm text-gray-700">
                          {feature.name}
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="ml-1 inline-block h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}

