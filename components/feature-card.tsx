"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  gradient?: string
  delay?: number
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  gradient = "from-primary/20 to-primary/5",
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <div className={`glass-card rounded-xl p-6 h-full flex flex-col relative overflow-hidden`}>
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="mb-4 relative">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm flex-grow mb-4">
            {description}
          </p>

          {/* Button */}
          <Link href={href} className="mt-auto">
            <Button 
              variant="outline" 
              className="w-full border-primary/30 hover:border-primary hover:bg-primary/10 text-primary group-hover:glow-blue transition-all"
            >
              Open Feature
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
