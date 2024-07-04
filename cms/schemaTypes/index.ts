import {frontpage} from './frontpage'
import {articleType} from './articleType'
import {eventType} from './eventType'
import {roleType} from './roleType'
import customImage from './objects/customImage'
import {infopageType} from './infopageType'
import {quoteType} from './objects/quoteType'
import RichTextEditor from './objects/RichTextEditor'
import {muxVideo} from './objects/muxVideo'

export const schemaTypes = [
  articleType,
  eventType,
  frontpage,
  roleType,
  customImage,
  infopageType,
  quoteType,
  RichTextEditor,
  muxVideo,
]
