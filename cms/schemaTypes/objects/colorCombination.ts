//These are temporary values, they will be replaced by the actual values from the design system

const COLORCOMBINATION = [
  {title: 'Mørk blå primær, grønn sekundær', value: 'darkBluePrimaryGreenSecondary'},
  {title: 'Lys rød primær, mørk blå sekundær', value: 'lightRedPrimaryDarkBlueSecondary'},
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
