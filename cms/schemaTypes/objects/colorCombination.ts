//These are temporary values, they will be replaced by the actual values from the design system

const COLORCOMBINATION = [
  {title: 'Lys blå primær, sort sekundær', value: 'dayThemeBlueBlack'},
  {title: 'Lys orange primær, blå sekundær', value: 'dayThemePeachBlue'},
  {title: 'Mørk lilla primær, hvit sekundær', value: 'nightThemePurpleWhite'},
  {title: 'Mørk blå primær, gul sekundær', value: 'nightThemeBlueYellow'},
]
const colorCombination = {
  name: 'colorCombination',
  title: 'Fargekombinasjon',
  type: 'string',
  options: {
    list: COLORCOMBINATION.map(({title, value}) => ({title, value})),
    layout: 'radio',
    default: COLORCOMBINATION[0].value,
  },
}

export default colorCombination
