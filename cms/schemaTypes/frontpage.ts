import { defineType, defineField } from "sanity";

export const frontpage = defineType({
    name: 'frontpage',
    title: 'Forside',
    type: 'document',
    fields: [
        defineField({
            name: 'Tittel',
            type: 'string',
            validation: (rule) => [
                rule.max(100).warning("Anbefaler kortere tittel."),
                rule.required().min(1).error("Tittel er påkrevd")
            ]
            }),
        defineField({
            name: 'Ingress',
            type: 'string',
            }),
        defineField({
            name: 'Bilde',
            type: 'image',
            validation: (rule) => [
                rule.required()
            ],
            fields: [
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Bildetekst',
                    validation: (rule) => [
                        rule.required().min(1).error("Bildetekst er påkrevd")
                    ]
                },
                {
                    name: 'attribution',
                    type: 'string',
                    title: 'Kreditering',
                    validation: (rule) => [
                        rule.required().min(1).error("Bildetekst er påkrevd")
                    ]
                }
            ]
            }),
    ],

})