"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "En quoi notre plateforme est-elle différente des autres solutions ?",
    answer: "Notre plateforme se distingue par son approche tout-en-un pour les créateurs de contenu. Vous pouvez gérer votre présence en ligne, vendre des produits digitaux, et collecter des emails, le tout depuis une seule interface intuitive. De plus, nous offrons des fonctionnalités uniques comme les liens privés avec capture d'emails et un système de formation vidéo intégré."
  },
  {
    question: "Combien coûte l'utilisation de la plateforme ?",
    answer: "Nous proposons plusieurs formules adaptées à vos besoins. Commencez gratuitement avec notre formule de base, puis évoluez vers nos offres Pro (19€/mois) ou Business (49€/mois) pour accéder à plus de fonctionnalités. Aucun engagement à long terme n'est requis."
  },
  {
    question: "Puis-je utiliser mon propre nom de domaine ?",
    answer: "Oui ! Les utilisateurs Pro et Business peuvent connecter leur propre nom de domaine à leur page de profil. Nous gérons tout le processus technique pour vous, rendant la configuration simple et rapide."
  },
  {
    question: "Comment fonctionne le système de paiement ?",
    answer: "Nous utilisons des solutions de paiement sécurisées comme Stripe pour traiter toutes les transactions. Vos clients peuvent payer par carte bancaire, et vous recevez vos revenus directement sur votre compte bancaire. Nous prélevons une petite commission sur chaque vente (5% pour les utilisateurs gratuits, 3% pour les Pro, 2% pour les Business)."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "La sécurité est notre priorité. Nous utilisons le chiffrement SSL/TLS, stockons vos données sur des serveurs sécurisés, et respectons toutes les normes RGPD. Vos informations et celles de vos clients sont protégées selon les plus hauts standards de l'industrie."
  },
  {
    question: "Comment puis-je commencer ?",
    answer: "C'est simple ! Inscrivez-vous gratuitement, personnalisez votre page de profil, et commencez à ajouter votre contenu. Notre interface intuitive vous guide à chaque étape, et notre support client est disponible pour vous aider en cas de besoin."
  }
]

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Des questions ?
              <br />
              Nous avons les réponses.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Tout ce que vous devez savoir pour démarrer et réussir avec notre plateforme.
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


