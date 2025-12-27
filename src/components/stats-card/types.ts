import type { JSX } from "react"

export type variantType = "outline" | "destructive" | "secondary" | "default" | null | undefined

export type StatsCardProps = {
    title: string,
    subtitle: string,
    icon: JSX.Element,
    Badge: {
        variant: variantType,
        className: string,
        badgeTitle: string,
        badgeIcon: JSX.Element,
    }
}