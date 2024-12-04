"use client"

import { ComponentType, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Link, ShoppingBag, Video, Mail, Smartphone, BarChart3, Shield, LucideProps } from 'lucide-react'

const features = [
    {
        title: "Profil personnalisé",
        description: "Créez une page centralisée pour tous vos réseaux, liens et contenus avec une URL personnalisée.",
        icon: UserCircle,
        color: "text-purple-500",
        gradient: "from-purple-400/25 to-purple-600/25"
    },
    {
        title: "Liens intelligents",
        description: "Partagez des liens publics ou privés pour booster vos conversions et capturer des emails.",
        icon: Link,
        color: "text-blue-500",
        gradient: "from-blue-400/25 to-blue-600/25"
    },
    {
        title: "Vente de produits digitaux",
        description: "Intégrez des paiements, livrez instantanément vos produits et suivez vos ventes.",
        icon: ShoppingBag,
        color: "text-green-500",
        gradient: "from-green-400/25 to-green-600/25"
    },
    {
        title: "Formations vidéo",
        description: "Hébergez des formations structurées par chapitres avec suivi de progression.",
        icon: Video,
        color: "text-red-500",
        gradient: "from-red-400/25 to-red-600/25"
    },
    {
        title: "Collecte d'emails",
        description: "Capturez facilement les emails de vos visiteurs et intégrez-les à votre CRM.",
        icon: Mail,
        color: "text-yellow-500",
        gradient: "from-yellow-400/25 to-yellow-600/25"
    },
    {
        title: "Design responsive",
        description: "Votre profil est optimisé pour tous les écrans avec un chargement ultra-rapide.",
        icon: Smartphone,
        color: "text-indigo-500",
        gradient: "from-indigo-400/25 to-indigo-600/25"
    },
    {
        title: "Statistiques en temps réel",
        description: "Suivez vos performances et prenez des décisions éclairées grâce à des analyses détaillées.",
        icon: BarChart3,
        color: "text-pink-500",
        gradient: "from-pink-400/25 to-pink-600/25"
    },
    {
        title: "Sécurité et simplicité",
        description: "Profitez d'une interface intuitive avec une sécurité de pointe pour vos données.",
        icon: Shield,
        color: "text-teal-500",
        gradient: "from-teal-400/25 to-teal-600/25"
    }
]

type FeatureCardType = {
    index: number,
    feature: {
        title: string,
        description: string,
        icon: ComponentType<LucideProps>,
        color: string,
        gradient: string
    }
}

const FeatureCard = ({ feature, index }: FeatureCardType) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="h-full bg-white border-gray-200 hover:border-gray-300 transition-colors duration-300">
                <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                    </CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export const Features = () => {
    const sectionRef = useRef(null)

    return (
        <section ref={sectionRef} id="features" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Tout ce dont vous avez besoin pour réussir en ligne</h2>
                    <p className="text-xl text-center text-gray-600 mb-12">Des outils puissants pour créer, gérer et monétiser votre contenu en toute simplicité.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}


