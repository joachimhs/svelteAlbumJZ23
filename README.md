# create-svelte app for Photoalbums

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating the project

```bash
# create a new project "svelteAlbumJZ23"
npm create svelte@latest svelteAlbumJZ23
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

# Tutorial

## Step 1: Show slideshow of front-images with CSS transitions: 

### Topics:

- Script, HTML and Style areas of +page.svelte
- Run code when browser loads: onMount
- Add page-wide variables and page-wide functions

Changes made in commit: [0169626](https://github.com/joachimhs/svelteAlbumJZ23/commit/0169626072b0d148e6dba679ba15c1ad06b5fb9a)

- [/src/routes/+page.svelte](https://github.com/joachimhs/svelteAlbumJZ23/blob/0169626072b0d148e6dba679ba15c1ad06b5fb9a/src/routes/%2Bpage.svelte)


## Step 2: Pass data from Svelte Server to client

### Topics: 

- Using +page.js to create JSON data via the load-function
- Getting the data on the client via the magic export let data variable in Svelte
- Iterating over the data with the {#each} keyword

Changes made in commit: [d6cb932](https://github.com/joachimhs/svelteAlbumJZ23/commit/d6cb932328d0755b2d9574792e81aa7cdff34757)

- [/src/routes/+page.js](https://github.com/joachimhs/svelteAlbumJZ23/blob/d6cb932328d0755b2d9574792e81aa7cdff34757/src/routes/%2Bpage.js)
- [/src/routes/+page.svelte](https://github.com/joachimhs/svelteAlbumJZ23/blob/d6cb932328d0755b2d9574792e81aa7cdff34757/src/routes/%2Bpage.svelte)

## Step 3: Move Slideshow to its own Slideshow-componennt

### Topics: 

- Using lib/components, and the $lib import statement
- Structure of a Svelte component
- Using component and passing in component parameters via export let paramName
- Using onMount in component to initialize component on DOM insert

Changes made in commit: 