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

Changes made in commit: [a59cddd](https://github.com/joachimhs/svelteAlbumJZ23/commit/a59cdddae242a85987dd6c8b7151d665325f79ad)

- [/lib/components/Slideshow.svelte](https://github.com/joachimhs/svelteAlbumJZ23/blob/a59cdddae242a85987dd6c8b7151d665325f79ad/src/lib/components/Slideshow.svelte)
- [/src/routes/+page.svelte](https://github.com/joachimhs/svelteAlbumJZ23/blob/a59cdddae242a85987dd6c8b7151d665325f79ad/src/routes/%2Bpage.svelte)

## Step 4: Add photo album grid-area

### Topics: 

- Adding global .css file with site-wide CSS
- Importing global .css file into +page.svelte
- Adding grid-area for photo albums

Changes made in commit: [86976bb](https://github.com/joachimhs/svelteAlbumJZ23/commit/86976bba7c58a972a1fba8326c615ca26475f67c)

- [/app.css](https://github.com/joachimhs/svelteAlbumJZ23/blob/86976bba7c58a972a1fba8326c615ca26475f67c/src/app.css)
- [/src/routes/+page.svelte](https://github.com/joachimhs/svelteAlbumJZ23/blob/86976bba7c58a972a1fba8326c615ca26475f67c/src/routes/%2Bpage.svelte)

<details>
    <summary>Code Diff for 86976bb</summary>

/app.css:
```diff
+ body {  
+     font-family: sans-serif;
+     line-height: 1.15;
+     margin: 0;
+ }
+
+ a {
+     text-decoration: none;
+ }
```

/src/routes/+page.svelte:
```diff
<script>
+     import '../app.css';
     import Slideshow from "$lib/components/Slideshow.svelte";

     export let data;
 </script>

 <Slideshow photos={data.photos}></Slideshow>
 
 + <div class="photo-albums-area">
+      <h1>Fotoalbum</h1>
+ 
+      <div class="photo-album-grid">
+          <a href="/album/makro">
+              <div class="grid-item">
+                  <img class="grid-item-photo" src="/images/IMGP4117.jpg">
+                  <div class="grid-item-caption">
+                      <h1>makro</h1>
+                  </div>
+              </div>
+          </a>
+          <a href="/album/norge2020">
+              <div class="grid-item">
+                 <img class="grid-item-photo" src="/images/background1.jpg">
+                  <div class="grid-item-caption">
+                     <h1>Norge 2020</h1>
+                  </div>
+              </div>
+          </a>
+      </div>
+  </div>

 <style>
+      .photo-albums-area h1 {
+          text-align: center;
+          margin-top: 40px;
+          margin-bottom: 40px;
+          font-weight: 100;
+          font-size: 4rem;
+      }
+ 
+      .photo-album-grid {
+          display: grid;
+          grid-template-columns: repeat(3, 30vw);
+          grid-gap: 3%;
+         margin-left: 1%;
+      }
+ 
+      .grid-item {
+          width: 30vw;
+          height: 20vh;
+          transition: opacity 0.3s ease-in-out, transform 0.5s;
+          overflow: hidden;
+      }
+ 
+      .grid-item img {
+          width: 30vw;
+          height: 20vh;
+          object-fit: cover;
+          transition: opacity 0.3s ease-in-out, transform 2s;
+      }
+ 
+      .grid-item:hover img {
+          transform: scale(1.7);
+      }
+ 
+      .grid-item-caption {
+          position: relative;
+          top: -120px;
+          opacity: 0;
+      }
+ 
+      .grid-item:hover {
+          transform: scale(1.15);
+      }
+ 
+      .in-album .grid-item-caption {
+          top: -100px;
+      }
+ 
+      .in-album .grid-item:hover {
+          transform: scale(1);
+      }
+ 
+      .in-album .grid-item-caption h1 {
+          font-size: 1em;
+      }
+ 
+      .grid-item-caption {
+          animation: ease-in-out 1s;
+      }
+ 
+      .grid-item:hover .grid-item-caption {
+          opacity: 1;
+          background: rgba(0,0,0,0.5);
+      }
+ 
+      .grid-item-caption h1 {
+          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
+          font-size: 3em;
+          color: white;
+          font-weight: 100;
+      }
 </style>
```
</details>