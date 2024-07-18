import {frontpage} from './frontpage'
import {articleType} from './articleType'
import {eventType} from './eventType'
import {roleType} from './roleType'
import customImage from './objects/customImage'
import {infopage} from './infopage'
import {quoteType} from './objects/quoteType'
import RichTextEditor from './objects/RichTextEditor'
import {videoType} from '././objects/videoType'
import metaTitle from './objects/metaTitle'
import metaDescription from './objects/metaDescription'
import colorCombination from './objects/colorCombination'
import imageMask from './objects/imageMask'
import roleGroups from './objects/roleGroups'
import {reviewType} from './objects/reviewType'
import {programpage} from './programpage'

export const schemaTypes = [
  articleType,
  eventType,
  frontpage,
  roleType,
  customImage,
  infopage,
  quoteType,
  RichTextEditor,
  roleGroups,
  videoType,
  metaTitle,
  metaDescription,
  colorCombination,
  imageMask,
  reviewType,
  programpage,
]
