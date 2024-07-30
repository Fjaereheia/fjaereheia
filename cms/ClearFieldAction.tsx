import React from 'react'
import {useDocumentOperation} from 'sanity'

export function DialogAction({
  id,
  type,
  published,
  draft,
}: {
  id: string
  type: string
  published: any
  draft: any
}): any {
  const doc = draft || published

  const [isDialogOpen, setDialogOpen] = React.useState(false)

  const {patch} = useDocumentOperation(id, type)

  const clearPatchField = () => {
    patch.execute([{set: {text: []}}])
  }

  return {
    label: `Clear text field`,
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: isDialogOpen && {
      type: 'dialog',
      onClose: () => {
        setDialogOpen(false)
      },
      header: 'Clear text field',
      content: (
        <>
          <p>Delete all content inside the text area</p>
          <button
            onClick={() => {
              clearPatchField()
              setDialogOpen(false)
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setDialogOpen(false)
            }}
          >
            Cancel
          </button>
        </>
      ),
    },
  }
}
