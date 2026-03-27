// components/sections/ServicesGrid.tsx
// Source : CONTENT.md > Home > Section 04 — Services
// CLAUDE.md v3.1 — section-base + filtres AnimatePresence + carte orpheline centrée

'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Globe, Smartphone, Layout, AppWindow, Cloud,
  GitMerge, Users, ShoppingCart, Monitor, CreditCard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ServiceCard } from '@/components/ui/ServiceCard'

// ── Types ──────────────────────────────────────────────────────────────────
type FilterCategory = 'Tous' | 'Développement' | 'Intégration' | 'Web' | 'Produit'

interface Service {
  id:          string
  icon:        React.ReactNode
  title:       string
  description: string
  href:        string
  category:    Exclude<FilterCategory, 'Tous'>
  badge?:      'POPULAIRE' | 'NOUVEAU' | 'BONUS'
}

// ── Données services ────────────────────────────────────────────────────────
// Source : CONTENT.md
const SERVICES: Service[] = [
  {
    id: 'dev-web',
    icon: <Globe className="w-5 h-5" />,
    title: 'Développement Web',
    description: 'Sites & applications web sur mesure, rapides sur mobile, optimisés SEO pour le marché africain.',
    href: '/services/developpement-web',
    category: 'Développement',
    badge: 'POPULAIRE',
  },
  {
    id: 'dev-mobile',
    icon: <Smartphone className="w-5 h-5" />,
    title: 'Développement Mobile',
    description: 'Applications iOS & Android natives, pensées pour l'utilisateur africain et les connexions limitées.',
    href: '/services/developpement-mobile',
    category: 'Développement',
  },
  {
    id: 'apps-web',
    icon: <AppWindow className="w-5 h-5" />,
    title: 'Applications Web',
    description: 'Dashboards, portails clients, outils métier et plateformes SaaS adaptés à vos processus.',
    href: '/services/applications-web',
    category: 'Développement',
  },
  {
    id: 'apps-mobile',
    icon: <Layout className="w-5 h-5" />,
    title: 'Applications Mobile',
    description: 'Solutions cross-platform iOS & Android — une seule base de code, deux plateformes.',
    href: '/services/applications-mobile',
    category: 'Développement',
  },
  {
    id: 'saas',
    icon: <Cloud className="w-5 h-5" />,
    title: 'Logiciels SaaS',
    description: 'De l'idée au produit SaaS en production : architecture, développement, déploiement et croissance.',
    href: '/services/logiciels-saas',
    category: 'Développement',
  },
  {
    id: 'erp',
    icon: <GitMerge className="w-5 h-5" />,
    title: 'Intégration ERP',
    description: 'Connectez vos systèmes de gestion, automatisez vos processus et éliminez les ressaisies manuelles.',
    href: '/services/integration-erp',
    category: 'Intégration',
  },
  {
    id: 'crm',
    icon: <Users className="w-5 h-5" />,
    title: 'Intégration CRM',
    description: 'Optimisez la relation client, centralisez vos leads et alignez vos équipes commerciales.',
    href: '/services/integration-crm',
    category: 'Intégration',
    badge: 'BONUS',
  },
  {
    id: 'ecommerce',
    icon: <ShoppingCart className="w-5 h-5" />,
    title: 'Sites E-commerce',
    description: 'Boutiques en ligne haute conversion avec Wave, Orange Money et paiements internationaux intégrés.',
    href: '/services/sites-ecommerce',
    category: 'Web',
    badge: 'BONUS',
  },
  {
    id: 'vitrine',
    icon: <Monitor className="w-5 h-5" />,
    title: 'Sites Vitrine',
    description: 'Présence web professionnelle, design sur mesure, SEO optimisé et chargement ultra-rapide.',
    href: '/services/sites-vitrine',
    category: 'Web',
  },
  {
    id: 'nfc',
    icon: <CreditCard className="w-5 h-5" />,
    title: 'Carte de Visite NFC',
    description: 'Cartes NFC connectées à votre profil digital — partagez vos coordonnées d'un simple geste.',
    href: '/services/carte-visite-nfc',
    category: 'Produit',
    badge: 'NOUVEAU',
  },
]

const FILTERS: FilterCategory[] = ['Tous', 'Développement', 'Intégration', 'Web', 'Produit']

// ── Composant ─────────────────────────────────────────────────────────────
export function ServicesGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Tous')

  const filtered = activeFilter === 'Tous'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeFilter)

  // Détecte si la dernière carte est seule sur sa ligne (grille 3 col)
  const isLastOrphan = filtered.length % 3 === 1

  return (
    <section className="section-base" id="services">
      <div className="container">

        {/* ── Header ── */}
        <div className="section-header center">
          <p className="text-eyebrow">CE QU'ON FAIT</p>
          <h2 className="text-h2 font-heading mt-2 mb-4">
            Nos Services
          </h2>
          <p className="text-body">
            Solutions complètes pour votre présence digitale
          </p>
        </div>

        {/* ── Filtres tabs ── */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="tablist"
          aria-label="Filtrer les services"
        >
          {FILTERS.map(filter => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                'border focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[--color-orange-500] focus-visible:ring-offset-2',
                activeFilter === filter
                  ? 'bg-[--color-orange-500] text-white border-[--color-orange-500] shadow-glow-sm'
                  : 'bg-white text-[--text-secondary] border-[--border-default] hover:border-[--color-orange-500] hover:text-[--color-orange-500]',
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── Grille services ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                // ── Carte orpheline : centrer si seule sur la dernière ligne ──
                className={cn(
                  isLastOrphan && i === filtered.length - 1
                    ? 'lg:col-start-2'
                    : '',
                )}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  badge={service.badge}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA secondaire ── */}
        <div className="mt-12 text-center">
          <p className="text-[--text-tertiary] text-sm mb-4">
            Vous ne savez pas quelle solution vous convient ?
          </p>
          <a
            href="/contact"
            className="btn btn-primary btn-md"
          >
            Discuter de mon projet
          </a>
        </div>

      </div>
    </section>
  )
}
