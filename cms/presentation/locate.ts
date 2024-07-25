// ./presentation/locate.ts

import {DocumentLocationResolver} from 'sanity/presentation'
import {map} from 'rxjs'

// Pass 'context' as the second argument
export const locate: DocumentLocationResolver = (params, context) => {
  console.log('params', params)
  // Set up locations for post documents
  if (params.type === 'event') {
    console.log('in here')
    // Subscribe to the latest slug and title
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{slug,title, _id}`,
      params,
      {perspective: 'previewDrafts'}, // returns a draft article if it exists
    )
    console.log('doc$', doc$)
    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null
        if (!doc || !doc.slug?.current) {
          return null
        }
        var hrf = `event/${doc.slug.current}`
        console.log('hrf', hrf)
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/event/${doc.slug.current}`,
            },
            {
              title: 'Event',
              href: '/',
            },
          ],
        }
      }),
    )
  }
  if (params.type === 'infopage') {
    console.log('in here')
    // Subscribe to the latest slug and title
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{slug, _id}`,
      params,
      {perspective: 'previewDrafts'}, // returns a draft article if it exists
    )
    console.log('doc$', doc$)
    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null
        if (!doc || !doc.slug?.current) {
          return null
        }
        var hrf = `info`
        console.log('hrf', hrf)
        return {
          locations: [
            {
              title: 'Untitled',
              href: `/info`,
            },
            {
              title: 'Event',
              href: '/',
            },
          ],
        }
      }),
    )
  }
  return null
}
