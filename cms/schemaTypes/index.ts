import {frontpage} from './frontpage'
import {articleType} from './articleType'
import {eventType} from './eventType'
import {roleType} from './roleType'
import customImage from './objects/customImage'
import {infopage} from './infopage'
import {quoteType} from './objects/quoteType'
import RichTextEditor from './objects/RichTextEditor'
import {muxVideo} from './objects/muxVideo'
import metaTitle from './objects/metaTitle'
import metaDescription from './objects/metaDescription'
import colorCombination from './objects/colorCombination'

export const schemaTypes = [
  articleType,
  eventType,
  frontpage,
  roleType,
  customImage,
  infopage,
  quoteType,
  RichTextEditor,
  muxVideo,
  metaTitle,
  metaDescription,
  colorCombination,
]
