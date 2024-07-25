# Bruddet ⛰

This is the repository contains Bruddet's frontend and cms application

## Build 🛠️

To build all apps and packages, run the following command:

```
npm run build
```

## Develop 💻

To develop all apps and packages, run the following command:

```
npm run dev
```

This will start all apps and packages in development mode. You can then visit the following URLs:

- [localhost:3000](http://localhost:3000) - The local version of the docs website
- [localhost:3333](http://localhost:3333) - The local version of the Sanity Studio

## Making changes in the cms

Navigate to `cms/schematypes`

- `index.ts` contains all the different types and documents that are shown in Sanity Studio.
- `/objects` contains different types that are reused across the different documents

### Apply new changes to Sanity Studio 📂

Inside the `cms` folder, run these commands:

#### 1. Schema extraction

```
npx sanity schema extract --enforce-required-fields
```

##### 2. Generate types from schema

```
npx sanity typegen generate
```

### Internationalization 🇳🇴🇬🇧

To implement language to a new document:

- Inside `cms/structure/documentinternationalization.ts` add the new document to schemaTypes

### Singletons 📄

This script will create one or many "singleton" documents for each language. It works by appending the language ID to the document ID and creating the translations.metadata document

1. Take a backup of your dataset with:

```
npx sanity dataset export
```

2. Copy this file to the root of your Sanity Studio project

3. Update the SINGLETONS and LANGUAGES constants to your needs

4. Run the script (replace <schema-type> with the name of your schema type):

```
npx sanity exec ./createSingletons.ts --with-user-token
```

5. Update your desk structure to use the new documents

6. Import the saved dataset:

```
npx sanity dataset import [exported dataset].tar.gz [your chosen dataset] --missing
```

## Frontend 💅

### Add new colors to Tailwind

Open `frontend/tailwind.config.js`:

- Add the hex code and name

### Add new color themes 🎨

Open `frontend/app/utils/colorCombinations.ts`

- Add a new case to all of the functions used

### SVG files

- Find `.svg` graphic components and masks in `frontend/app/assets`
