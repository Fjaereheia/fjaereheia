import { defineField, defineType, listenQuery } from "sanity";

export const footerType = defineType({
    name: 'footer',
    title: 'Bunntekst',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            title: 'Kontaktinformasjon',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                },
            ]

        }),
        defineField({
            name: 'portabletext',
            title: 'Link',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'External Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL'
                                    },
                                    {
                                        title: 'open in new tab',
                                        name: 'blank',
                                        description: 'test',
                                        type: 'boolean'
                                    },
                                    {
                                        name: 'icon',
                                        type: 'object',
                                        title: 'Ikon',
                                        fields: [
                                            {
                                                name: 'name',
                                                type: 'string',
                                                title: 'Ikonnavn',
                                                description: 'Velg navn for ikon',
                                                options: {
                                                    list: [
                                                        { title: 'Facebook', value: 'fa-facebook' },
                                                        { title: 'Twitter', value: 'fa-twitter' },
                                                        { title: 'Instagram', value: 'fa-instagram' },
                                                    ]
                                                }
                                            },
                                        ]

                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }),        
    ]
})