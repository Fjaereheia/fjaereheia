//These are temporary values, they will be replaced by the actual values from the design system
export interface ColorCombination {
  title: string
  value: string
  theme: 'day' | 'night'
  text: string
  textBorder: string
  primaryBg: string
  primaryBorder: string
  primaryText: string
  secondaryBg: string
  secondaryBorder: string
}

export const COLORCOMBINATION: ColorCombination[] = [
  {
    title: 'Lys blå primær, sort sekundær',
    value: 'dayThemeBlueBlack',
    theme: 'day',
    text: 'text-black',
    textBorder: 'border-black',
    primaryBg: 'bg-dayThemeBlueBlack-primary',
    primaryBorder: 'border-dayThemeBlueBlack-primary',
    primaryText: 'text-dayThemeBlueBlack-primary',
    secondaryBg: 'bg-dayThemeBlueBlack-secondary',
    secondaryBorder: 'border-dayThemeBlueBlack-secondary',
  },
  {
    title: 'Lys orange primær, blå sekundær',
    value: 'dayThemePeachBlue',
    theme: 'day',
    text: 'text-black',
    textBorder: 'border-black',
    primaryBg: 'bg-dayThemePeachBlue-primary',
    primaryBorder: 'border-dayThemePeachBlue-primary',
    primaryText: 'text-dayThemePeachBlue-primary',
    secondaryBg: 'bg-dayThemePeachBlue-secondary',
    secondaryBorder: 'border-dayThemePeachBlue-secondary',
  },
  {
    title: 'Mørk lilla primær, hvit sekundær',
    value: 'nightThemePurpleWhite',
    theme: 'night',
    text: 'text-white',
    textBorder: 'border-white',
    primaryBg: 'bg-nightThemePurpleWhite-primary',
    primaryBorder: 'border-nightThemePurpleWhite-primary',
    primaryText: 'text-nightThemePurpleWhite-primary',
    secondaryBg: 'bg-nightThemePurpleWhite-secondary',
    secondaryBorder: 'border-nightThemePurpleWhite-secondary',
  },
  {
    title: 'Mørk blå primær, gul sekundær',
    value: 'nightThemeBlueYellow',
    theme: 'night',
    text: 'text-white',
    textBorder: 'border-white',
    primaryBg: 'bg-nightThemeBlueYellow-primary',
    primaryBorder: 'border-nightThemeBlueYellow-primary',
    primaryText: 'text-nightThemeBlueYellow-primary',
    secondaryBg: 'bg-nightThemeBlueYellow-secondary',
    secondaryBorder: 'border-nightThemeBlueYellow-secondary',
  },
]

const dayThemes = COLORCOMBINATION.filter((theme) => theme.theme === 'day')
const nightThemes = COLORCOMBINATION.filter((theme) => theme.theme === 'night')

export const colorCombinationDay = {
  name: 'colorCombinationDay',
  title: 'Fargekombinasjon',
  type: 'string',
  options: {
    list: dayThemes.map(({title, value}) => ({title, value})),
    layout: 'radio',
    default: dayThemes[0].value,
  },
}

export const colorCombinationNight = {
  name: 'colorCombinationNight',
  title: 'Fargekombinasjon',
  type: 'string',
  options: {
    list: nightThemes.map(({title, value}) => ({title, value})),
    layout: 'radio',
    default: nightThemes[0].value,
  },
}
