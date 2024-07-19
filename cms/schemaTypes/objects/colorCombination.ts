//These are temporary values, they will be replaced by the actual values from the design system

const COLORCOMBINATION = [
  {title: 'Lys blå primær, sort sekundær', value: 'dayThemeBlueBlack', theme: 'day'},
  {title: 'Lys orange primær, blå sekundær', value: 'dayThemePeachBlue', theme: 'day'},
  {title: 'Mørk lilla primær, hvit sekundær', value: 'nightThemePurpleWhite', theme: 'night'},
  {title: 'Mørk blå primær, gul sekundær', value: 'nightThemeBlueYellow', theme: 'night'},
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
