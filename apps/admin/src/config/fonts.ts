import {
  Geist_Mono,
  Montserrat,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google"

import { brandConfig } from "@/src/config/brand.config"

const isViverde = brandConfig.id === "viverde"

const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const fontMontserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const fontMontserratSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontPlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const fontHeading = isViverde ? fontMontserratHeading : fontOutfit
const fontSans = isViverde ? fontPlusJakartaSans : fontMontserratSans

export const fonts = {
  heading: fontHeading,
  sans: fontSans,
  mono: fontMono,
}

export const fontVariables = `${fontHeading.variable} ${fontSans.variable} ${fontMono.variable}`
