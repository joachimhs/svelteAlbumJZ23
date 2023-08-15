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

- Using +layout.js to create JSON data via the load-function
- Getting the data on the client via the magic export let data variable in Svelte
- Iterating over the data with the {#each} keyword

Changes made in commit: [d6cb932](https://github.com/joachimhs/svelteAlbumJZ23/commit/d6cb932328d0755b2d9574792e81aa7cdff34757)

- [/src/routes/+layout.js](https://github.com/joachimhs/svelteAlbumJZ23/blob/d6cb932328d0755b2d9574792e81aa7cdff34757/src/routes/%2Bpage.js)
- [/src/routes/+page.svelte](https://github.com/joachimhs/svelteAlbumJZ23/blob/d6cb932328d0755b2d9574792e81aa7cdff34757/src/routes/%2Bpage.svelte)

## Step 3: Move Slideshow to its own Slideshow-component

### Topics: 

- Using lib/components, and the $lib import statement
- Structure of a Svelte component
- Using component and passing in component parameters via export let paramName
- Using onMount in component to initialize component on DOM insert

Changes made in commit: [a59cddd](https://github.com/joachimhs/svelteAlbumJZ23/commit/a59cdddae242a85987dd6c8b7151d665325f79ad)

### Code Diff for Step 3: a59cddd

<details>
    <summary>/lib/components/Slideshow.svelte:</summary>

```diff
@@ -0,0 +1,79 @@
+<script>
+    import {onMount} from "svelte";
+
+    export let photos;
+
+    let intervalId = null;
+    let intervalMs = 10000;
+    let photoLength = 0;
+    let currentPhoto = 0;
+
+    onMount(() => {
+        photoLength = photos ? photos.length : 0;
+        setFirstPhoto();
+    });
+
+    function changePhoto() {
+        console.log("change photo: " + photoLength);
+        let nextPhoto = currentPhoto >= photoLength - 1 ? 0 : currentPhoto + 1;
+        console.log("currentPhoto: " + currentPhoto + " nextPhoto:" + nextPhoto);
+
+        if (document.getElementById("cf2")) {
+            document.getElementById("cf2").children[currentPhoto].classList.add("transparent");
+            document.getElementById("cf2").children[currentPhoto].classList.remove("zoom");
+            document.getElementById("cf2").children[nextPhoto].classList.remove("transparent");
+            document.getElementById("cf2").children[nextPhoto].classList.add("zoom");
+        }
+
+        currentPhoto = nextPhoto;
+    }
+
+    function setFirstPhoto() {
+        if (document.getElementById("cf2") && document.getElementById("cf2").children.length > 0) {
+            document.getElementById("cf2").children[0].classList.remove("transparent");
+            setTimeout(function () {
+                document.getElementById("cf2").children[0].classList.add("zoom");
+            }, 1000);
+        }
+
+        if (intervalId) {
+            clearInterval(intervalId);
+        }
+
+        intervalId = setInterval(changePhoto, intervalMs);
+    }
+</script>
+
+<div id="cf2">
+    {#each photos as photo}
+        <div class="photo transparent" style="background-image: url('/images/{photo.id}')"/>
+    {/each}
+</div>
+
+<style>
+    #cf2 {
+        position: relative;
+        width: 100vw;
+        height: 80vh;
+        overflow: hidden;
+    }
+
+    #cf2 div.transparent {
+        opacity: 0;
+    }
+
+    #cf2 div.photo {
+        position: absolute;
+        top: 0;
+        width: 100vw;
+        height: 80vh;
+        object-fit: cover;
+        transition: opacity 1s ease-in-out, transform 10s;
+        background-size: cover;
+        background-position: center;
+    }
+
+    :global(#cf2 div.zoom) {
+        transform: scale(1.2);
+    }
+</style>
```
</details>

<details>
    <summary>/src/routes/+page.svelte</summary>

````diff
 <script>
-
-    import {onMount} from "svelte";
+    import Slideshow from "$lib/components/Slideshow.svelte";
 
     export let data;
-
-    let intervalId = null;
-    let intervalMs = 10000;
-    let photoLength = 0;
-    let currentPhoto = 0;
-
-    onMount(() => {
-        photoLength = document.querySelector("#cf2").children.length;
-        setFirstPhoto();
-    });
-
-    function changePhoto() {
-        console.log("change photo: " + photoLength);
-        let nextPhoto = currentPhoto >= photoLength - 1 ? 0 : currentPhoto + 1;
-        console.log("currentPhoto: " + currentPhoto + " nextPhoto:" + nextPhoto);
-
-        if (document.getElementById("cf2")) {
-            document.getElementById("cf2").children[currentPhoto].classList.add("transparent");
-            document.getElementById("cf2").children[currentPhoto].classList.remove("zoom");
-            document.getElementById("cf2").children[nextPhoto].classList.remove("transparent");
-            document.getElementById("cf2").children[nextPhoto].classList.add("zoom");
-        }
-
-        currentPhoto = nextPhoto;
-    }
-
-    function setFirstPhoto() {
-        if (document.getElementById("cf2") && document.getElementById("cf2").children.length > 0) {
-            document.getElementById("cf2").children[0].classList.remove("transparent");
-            setTimeout(function () {
-                console.log('ADDING ZOOM: ' + document.getElementById("cf2").children[0].classList);
-                document.getElementById("cf2").children[0].classList.add("zoom");
-                console.log(document.getElementById("cf2").children[0].classList);
-            }, 1000);
-        }
-
-        if (intervalId) {
-            clearInterval(intervalId);
-        }
-
-        intervalId = setInterval(changePhoto, intervalMs);
-    }
 </script>
 
-<div id="cf2">
-    {#each data.photos as photo}
-        <div class="photo transparent" style="background-image: url('/images/{photo.id}')"/>
-    {/each}
-</div>
+<Slideshow photos={data.photos}></Slideshow>
 
 <style>
-    #cf2 {
-        position: relative;
-        width: 100vw;
-        height: 80vh;
-        overflow: hidden;
-    }
-
-    #cf2 div.transparent {
-        opacity: 0;
-    }
-
-    #cf2 div.photo {
-        position: absolute;
-        top: 0;
-        width: 100vw;
-        height: 80vh;
-        object-fit: cover;
-        transition: opacity 1s ease-in-out, transform 10s;
-        background-size: cover;
-        background-position: center;
-    }
 
-    :global(#cf2 div.zoom) {
-        transform: scale(1.2);
-    }
 </style>
````

</details>

## Step 4: Add photo album grid-area

### Topics: 

- Adding global .css file with site-wide CSS
- Importing global .css file into +page.svelte
- Adding grid-area for photo albums

Changes made in commit: [86976bb](https://github.com/joachimhs/svelteAlbumJZ23/commit/86976bba7c58a972a1fba8326c615ca26475f67c)

### Code Code Diff for Step 4: 86976bb

<details>
    <summary>/app.css</summary>

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
</details>

<details>
    <summary>/src/routes/+page.svelte:</summary>

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

## Step 5: Create album-index component

### Topics: 

- Moving album index to its own component: PhotoAlbumIndex
- Also returning album JSON from the SvelteKit server via load()
- Adding checks to support non-iterable albums in PhotoAlbumIndex component
- Adding {:else} fallback to the album iterator

Changes made in commit: [ce023b7](https://github.com/joachimhs/svelteAlbumJZ23/commit/ce023b7c5f2dec8761ad6f93b9fa9bb676cbef0a)

### Code Code Diff for Step 4: ce023b7

<details>
    <summary>/src/lib/components/PhotoAlbumIndex.svelte</summary>

```diff
+<script>
+    import {onMount} from "svelte";
+
+    export let albums;
+
+    onMount(() => {
+        if (!albums) {
+            albums = [];
+        }
+    });
     +</script>
+
+<div class="photo-albums-area">
+    <h1>Fotoalbum</h1>
+
+    {#if albums}
+        <div class="photo-album-grid">
+            {#each albums as album}
+                <a href="/album/{album.id}">
+                    <div class="grid-item">
+                        <img class="grid-item-photo" src="/images/{album.image}">
+                        <div class="grid-item-caption">
+                            <h1>{album.caption}</h1>
+                        </div>
+                    </div>
+                </a>
+                {:else}
+                <div>Ingen fotoalbum er lagt til</div>
+            {/each}
+        </div>
+    {/if}
     +</div>
+
+<style>
+    .photo-albums-area h1 {
+        text-align: center;
+        margin-top: 40px;
+        margin-bottom: 40px;
+        font-weight: 100;
+        font-size: 4rem;
+    }
+
+    .photo-album-grid {
+        display: grid;
+        grid-template-columns: repeat(3, 30vw);
+        grid-gap: 3%;
+        margin-left: 1%;
+    }
+
+    .grid-item {
+        width: 30vw;
+        height: 20vh;
+        transition: opacity 0.3s ease-in-out, transform 0.5s;
+        overflow: hidden;
+    }
+
+    .grid-item img {
+        width: 30vw;
+        height: 20vh;
+        object-fit: cover;
+        transition: opacity 0.3s ease-in-out, transform 2s;
+    }
+
+    .grid-item:hover img {
+        transform: scale(1.7);
+    }
+
+    .grid-item-caption {
+        position: relative;
+        top: -120px;
+        opacity: 0;
+    }
+
+    .grid-item:hover {
+        transform: scale(1.15);
+    }
+
+    .in-album .grid-item-caption {
+        top: -100px;
+    }
+
+    .in-album .grid-item:hover {
+        transform: scale(1);
+    }
+
+    .in-album .grid-item-caption h1 {
+        font-size: 1em;
+    }
+
+    .grid-item-caption {
+        animation: ease-in-out 1s;
+    }
+
+    .grid-item:hover .grid-item-caption {
+        opacity: 1;
+        background: rgba(0,0,0,0.5);
+    }
+
+    .grid-item-caption h1 {
+        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
+        font-size: 3em;
+        color: white;
+        font-weight: 100;
+    }
```
</details>

<details>
    <summary>/src/routes/+layout.js</summary>

```diff
export function load({ params }) {
id: 'IMGP6801.jpg',
title: 'Sommerfugl'
}
+        ],
+        albums: [
+            {
+                id: 'makro',
+                image: 'IMGP4117.jpg',
+                caption: 'makro'
+            },
+            {
+                id: 'norge2020',
+                image: 'background1.jpg',
+                caption: 'Norge 2020'
+            }
         ]
  };
}
```
</details>

<details>
    <summary>/src/routes/+page.svelte</summary>

```diff
 <script>
     import '../app.css';
     import Slideshow from "$lib/components/Slideshow.svelte";
+    import PhotoAlbumIndex from "$lib/components/PhotoAlbumIndex.svelte";
 
     export let data;
 </script>
 
 <Slideshow photos={data.photos}></Slideshow>
-
-<div class="photo-albums-area">
-    <h1>Fotoalbum</h1>
-
-    <div class="photo-album-grid">
-        <a href="/album/makro">
-            <div class="grid-item">
-                <img class="grid-item-photo" src="/images/IMGP4117.jpg">
-                <div class="grid-item-caption">
-                    <h1>makro</h1>
-                </div>
-            </div>
-        </a>
-        <a href="/album/norge2020">
-            <div class="grid-item">
-                <img class="grid-item-photo" src="/images/background1.jpg">
-                <div class="grid-item-caption">
-                    <h1>Norge 2020</h1>
-                </div>
-            </div>
-        </a>
-    </div>
-</div>
+<PhotoAlbumIndex albums={data.albums}></PhotoAlbumIndex>
 
 <style>
-    .photo-albums-area h1 {
-        text-align: center;
-        margin-top: 40px;
-        margin-bottom: 40px;
-        font-weight: 100;
-        font-size: 4rem;
-    }
-
-    .photo-album-grid {
-        display: grid;
-        grid-template-columns: repeat(3, 30vw);
-        grid-gap: 3%;
-        margin-left: 1%;
-    }
-
-    .grid-item {
-        width: 30vw;
-        height: 20vh;
-        transition: opacity 0.3s ease-in-out, transform 0.5s;
-        overflow: hidden;
-    }
-
-    .grid-item img {
-        width: 30vw;
-        height: 20vh;
-        object-fit: cover;
-        transition: opacity 0.3s ease-in-out, transform 2s;
-    }
-
-    .grid-item:hover img {
-        transform: scale(1.7);
-    }
-
-    .grid-item-caption {
-        position: relative;
-        top: -120px;
-        opacity: 0;
-    }
-
-    .grid-item:hover {
-        transform: scale(1.15);
-    }
-
-    .in-album .grid-item-caption {
-        top: -100px;
-    }
-
-    .in-album .grid-item:hover {
-        transform: scale(1);
-    }
-
-    .in-album .grid-item-caption h1 {
-        font-size: 1em;
-    }
-
-    .grid-item-caption {
-        animation: ease-in-out 1s;
-    }
-
-    .grid-item:hover .grid-item-caption {
-        opacity: 1;
-        background: rgba(0,0,0,0.5);
-    }
 
-    .grid-item-caption h1 {
-        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
-        font-size: 3em;
-        color: white;
-        font-weight: 100;
-    }
 </style>
 ```
</details>

## Step 6: Create album route and fetch data from parent

### Topics:

- Introduction to +layout.js to fetch data also available to children routes
- Creating a static route (album) and a dynamic route ([albumid])
- Fetching relevant data from the parent +layout.js file using load() with both {parent and params}

Changes made in commit: [cca5f89](https://github.com/joachimhs/svelteAlbumJZ23/commit/cca5f89990f98145b9938c17fc9afab9cca0f23b)

### Code Code Diff for Step 6: 

<details>
    <summary>Rename /src/routes/+page.js to /src/routes/+layout.js</summary>

- rename from src/routes/+page.js
- rename to src/routes/+layout.js
</details>

<details>
    <summary>/src/routes/album/[albumid]/+page.js</summary>

```diff
+export async function load({parent, params}) {
+    const data = await parent();
+    let album = await data.albums.find((album) => album.caption === params.albumid);
+
+    return { album: album};
+}
```
</details>

<details>
    <summary>/src/routes/album/[albumid]/+page.svelte</summary>

```diff
+<script>
+    import {page} from "$app/stores";
+
+    export let data;
+</script>
+
+<h1>Velkommen til {$page.params.albumid} albumet!</h1>
+
+<div>{data.album.caption}</div>
```
</details>
