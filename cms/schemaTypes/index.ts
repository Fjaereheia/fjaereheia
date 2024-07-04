import {frontpage} from './frontpage'
import {articleType} from './articleType'
import {eventType} from './eventType'
import {roleType} from './roleType'
import customImage from './objects/customImage'
import {quoteType} from './objects/quoteType'
import RichTextEditor from './objects/RichTextEditor'
import {footerType} from './footerType'
import metaTitle from './objects/metaTitle'
import metaDescription from './objects/metaDescription'

export const schemaTypes = [
  articleType,
  eventType,
  frontpage,
  roleType,
  customImage,
  quoteType,
  RichTextEditor,
  footerType,
  metaTitle,
  metaDescription,
]
