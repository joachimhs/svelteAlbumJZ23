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

<table>
<tr>
<th colspan="2">
<h2>Step 0: What is Svelte and SvelteKit?</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part0_slides.html" target="_blank">
        <img alt="Slide part 0" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part0_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Svelte and SvelteKit Introduction
- Svelte Directory Structure
- Svelte Components
- Svelte Stores
- Server-Side Rendering (SSR)
- Routing

</td>
</tr>
</table>



<table>
<tr>
<th colspan="2">
<h2>Step 1: Show slideshow of front-images with CSS transitions</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part1_slides.html" target="_blank">
    <img alt="Slide part 1" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part1_cover.jpg">
</a>
</td>
<td>

### Topics:

- Script, HTML and Style areas of +page.svelte
- Run code when browser loads: onMount
- Add page-wide variables and page-wide functions

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [0169626](https://github.com/joachimhs/svelteAlbumJZ23/commit/0169626072b0d148e6dba679ba15c1ad06b5fb9a)

<details>
  <summary>/src/routes/+page.svelte</summary>

```diff
+<script>
+
+    import {onMount} from "svelte";
+
+    let intervalId = null;
+    let intervalMs = 10000;
+    let photoLength = 0;
+    let currentPhoto = 0;
+
+    onMount(() => {
+        photoLength = document.querySelector("#cf2").children.length;
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
+                console.log('ADDING ZOOM: ' + document.getElementById("cf2").children[0].classList);
+                document.getElementById("cf2").children[0].classList.add("zoom");
+                console.log(document.getElementById("cf2").children[0].classList);
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
+    <div class="photo transparent" style="background-image: url('/images/background1.jpg')"/>
+    <div class="photo transparent" style="background-image: url('/images/IMGP4117.jpg')"/>
+    <div class="photo transparent" style="background-image: url('/images/IMGP4642.jpg')"/>
+    <div class="photo transparent" style="background-image: url('/images/IMGP6801.jpg')"/>
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

</td>
</tr>
</table>



<table>
<tr>
<th colspan="2">
<h2>Step 2: Pass data from Svelte Server to client</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part2_slides.html" target="_blank">
        <img alt="Slide part 2" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part2_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Using +layout.js to create JSON data via the load-function
- Getting the data on the client via the magic export let data variable in Svelte
- Iterating over the data with the {#each} keyword

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [d6cb932](https://github.com/joachimhs/svelteAlbumJZ23/commit/d6cb932328d0755b2d9574792e81aa7cdff34757)

<details>
  <summary>/src/routes/+page.js</summary>

```diff
+export function load({ params }) {
+    return {
+        photos: [
+            {
+                id: 'IMGP4117.jpg',
+                title: 'Valmue'
+            },
+            {
+                id: 'background1.jpg',
+                title: 'Tyttebær'
+            },
+            {
+                id: 'IMGP4642.jpg',
+                title: 'Tyttebær 2'
+            },
+            {
+                id: 'IMGP6801.jpg',
+                title: 'Sommerfugl'
+            }
+        ]
+    };
+}
```
</details>

<details>
  <summary>/src/routes/+page.svelte</summary>

```diff
     import {onMount} from "svelte";
 
+    export let data;
+
     let intervalId = null;
     let intervalMs = 10000;
     let photoLength = 0;
     
    let intervalId = null;
    let intervalMs = 10000;
    let photoLength = 0;
    let currentPhoto = 0;

    onMount(() => {
        photoLength = document.querySelector("#cf2").children.length;
        setFirstPhoto();
    });

    function changePhoto() {
        console.log("change photo: " + photoLength);
        let nextPhoto = currentPhoto >= photoLength - 1 ? 0 : currentPhoto + 1;
        console.log("currentPhoto: " + currentPhoto + " nextPhoto:" + nextPhoto);

        if (document.getElementById("cf2")) {
            document.getElementById("cf2").children[currentPhoto].classList.add("transparent");
            document.getElementById("cf2").children[currentPhoto].classList.remove("zoom");
            document.getElementById("cf2").children[nextPhoto].classList.remove("transparent");
            document.getElementById("cf2").children[nextPhoto].classList.add("zoom");
        }

        currentPhoto = nextPhoto;
    }

    function setFirstPhoto() {
        if (document.getElementById("cf2") && document.getElementById("cf2").children.length > 0) {
            document.getElementById("cf2").children[0].classList.remove("transparent");
            setTimeout(function () {
                console.log('ADDING ZOOM: ' + document.getElementById("cf2").children[0].classList);
                document.getElementById("cf2").children[0].classList.add("zoom");
                console.log(document.getElementById("cf2").children[0].classList);
            }, 1000);
        }

        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(changePhoto, intervalMs);
    }
 </script>
 
 <div id="cf2">
-    <div class="photo transparent" style="background-image: url('/images/background1.jpg')"/>
-    <div class="photo transparent" style="background-image: url('/images/IMGP4117.jpg')"/>
-    <div class="photo transparent" style="background-image: url('/images/IMGP4642.jpg')"/>
-    <div class="photo transparent" style="background-image: url('/images/IMGP6801.jpg')"/>
+    {#each data.photos as photo}
+        <div class="photo transparent" style="background-image: url('/images/{photo.id}')"/>
+    {/each}
 </div>
 
 <style>
    #cf2 {
        position: relative;
        width: 100vw;
        height: 80vh;
        overflow: hidden;
    }

    #cf2 div.transparent {
        opacity: 0;
    }

    #cf2 div.photo {
        position: absolute;
        top: 0;
        width: 100vw;
        height: 80vh;
        object-fit: cover;
        transition: opacity 1s ease-in-out, transform 10s;
        background-size: cover;
        background-position: center;
    }

    :global(#cf2 div.zoom) {
        transform: scale(1.2);
    }
</style>
```
</details>

</td>
</tr>
</table>



<table>
<tr>
<th colspan="2">
<h2>Step 3: Move Slideshow to its own Slideshow-component</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part3_slides.html" target="_blank">
        <img alt="Slide part 3" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part3_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Using lib/components, and the $lib import statement
- Structure of a Svelte component
- Using component and passing in component parameters via export let paramName
- Using onMount in component to initialize component on DOM insert

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [a59cddd](https://github.com/joachimhs/svelteAlbumJZ23/commit/a59cdddae242a85987dd6c8b7151d665325f79ad)

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

</td>
</tr>
</table>



<table>
<tr>
<th colspan="2">
<h2>Step 4: Add photo album grid-area</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part4_slides.html" target="_blank">
        <img alt="Slide part 4" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part4_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Adding global .css file with site-wide CSS
- Importing global .css file into +page.svelte
- Adding grid-area for photo albums

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [86976bb](https://github.com/joachimhs/svelteAlbumJZ23/commit/86976bba7c58a972a1fba8326c615ca26475f67c)

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

</td>
</tr>
</table>



<table>
<tr>
<th colspan="2">
<h2>Step 5: Create album-index component</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part5_slides.html" target="_blank">
        <img alt="Slide part 5" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part5_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Moving album index to its own component: PhotoAlbumIndex
- Also returning album JSON from the SvelteKit server via load()
- Adding checks to support non-iterable albums in PhotoAlbumIndex component
- Adding {:else} fallback to the album iterator

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [ce023b7](https://github.com/joachimhs/svelteAlbumJZ23/commit/ce023b7c5f2dec8761ad6f93b9fa9bb676cbef0a)

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

</td>
</tr>
</table>




<table>
<tr>
<th colspan="2">
<h2>Step 6: Create album route and fetch data from parent</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part6_slides.html" target="_blank">
        <img alt="Slide part 6" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part6_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Introduction to +layout.js to fetch data also available to children routes
- Creating a static route (album) and a dynamic route ([albumid])
- Fetching relevant data from the parent +layout.js file using load() with both {parent and params}

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [cca5f89](https://github.com/joachimhs/svelteAlbumJZ23/commit/cca5f89990f98145b9938c17fc9afab9cca0f23b)

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

</td>
</tr>
</table>



<table>
<tr>
<th colspan="2">
<h2>Step 7: Create the initial photo album</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part7_slides.html" target="_blank">
        <img alt="Slide part 7" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part7_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Expand the album data with photos/images
- Adding the first image and album thumbnails to the [albumid] +page.svelte

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [d33963b](https://github.com/joachimhs/svelteAlbumJZ23/commit/d33963ba5cd3dfd60e6f67694d291ebd31a1fd60)

<details>
    <summary>/src/routes/+layout.js</summary>

```diff
             export function load({ params }) {
             {
                 id: 'makro',
                 image: 'IMGP4117.jpg',
-                caption: 'makro'
+                caption: 'makro',
+                images: ['IMGP4117.jpg', 'background1.jpg', 'IMGP4642.jpg', 'IMGP6801.jpg']
             },
             {
                 id: 'norge2020',
                 image: 'background1.jpg',
-                caption: 'Norge 2020'
+                caption: 'Norge 2020',
+                images: ['IMGP4117.jpg', 'background1.jpg']
             }
         ]
     };
```
</details>

<details>
    <summary>/src/routes/album/[albumid]/+page.svelte</summary>

```diff
@@ -1,9 +1,97 @@
 <script>
     import {page} from "$app/stores";
+    import {onMount} from "svelte";
 
+    let selectedImage = null;
+    onMount(() => {
+        selectedImage = data.album.image ? data.album.image : null;
+    });
     export let data;
 </script>
 
 <h1>Velkommen til {$page.params.albumid} albumet!</h1>
 
-<div>{data.album.caption}</div>
\ No newline at end of file
+<div class="full-image">
+    <img src="/images/{selectedImage}" />
+</div>
+
+<div class="photo-albums-area in-album">
+    <div class="grid-container">
+        {#each data.album.images as image}
+            <a href="/album/{data.album.id}/photo/{image}">
+                <div class="grid-item">
+                    <img class="grid-item-photo" src="/images/{image}">
+                </div>
+            </a>
+        {/each}
+    </div>
+</div>
+
+<style>
+    .full-image {
+        width: 100vw;
+        height: 75vh;
+        text-align: center;
+        margin-bottom: 5vh;
+    }
+
+    .full-image img {
+        max-width: 100%;
+        height: clamp(10vh, 1000px, 75vh);
+        object-fit: contain;
+        transition: all 0.5s;
+    }
+
+    .in-album {
+        width: 100vw;
+        max-height: 20vh;
+        overflow-y: scroll;
+    }
+
+    .grid-container {
+        display: grid;
+        grid-template-columns: repeat(3, 30vw);
+        grid-gap: 3%;
+        margin-left: 1%;
+    }
+
+    .in-album .grid-container {
+        grid-template-columns: repeat(6, 16vw);
+        grid-gap: 1%;
+    }
+
+    .in-album .grid-item {
+        max-height: 17vh;
+        max-width: 16vw;
+    }
+
+    .in-album .grid-item img {
+        max-height: 17vh;
+        max-width: 16vw;
+        object-fit: cover;
+        object-position: center;
+    }
+
+    .grid-item img {
+        width: 30vw;
+        height: 20vh;
+        object-fit: cover;
+        transition: opacity 0.3s ease-in-out, transform 2s;
+    }
+
+    .grid-item {
+        width: 30vw;
+        height: 20vh;
+        transition: opacity 0.3s ease-in-out, transform 0.5s;
+        overflow: hidden;
+    }
+
+    .in-album .grid-item img {
+        max-height: 17vh;
+        max-width: 16vw;
+        object-fit: cover;
+        object-position: center;
+    }
+
+
+</style>
```
</details>

</td>
</tr>
</table>


<table>
<tr>
<th colspan="2">
<h2>Step 8: Adding the photo route and refactoring</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part8_slides.html" target="_blank">
        <img alt="Slide part 8" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part8_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Adding +layout.svelte to [albumid] dynamic route
- Moving code for thumbnails into +layout.svelte
- Moving server-fetch from +page.js to +layout.js in [albumid] dynamic route
- Adding [photoid] dynamic route for each photo
- Redirecting user from album to photo if no photo is present in URL/params
- Finding the correct photo from the photos array in [photoid]/+page.js

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [1e1c8f4](https://github.com/joachimhs/svelteAlbumJZ23/commit/1e1c8f48461714894fd958c0a072142f9b4019be)

<details>
    <summary>Rename src/routes/album/[albumid]/+page.js to src/routes/album/[albumid]/+layout.js</summary>

- rename from src/routes/album/[albumid]/+page.js
- rename to src/routes/album/[albumid]/+layout.js
</details>

<details>
    <summary>/src/routes/album/[albumid]/+layout.svelte</summary>

```diff
@@ -0,0 +1,100 @@
+<script>
+    import {page} from "$app/stores";
+    import {onMount} from "svelte";
+    import {goto} from "$app/navigation";
+
+    onMount(() => {
+        if ($page.params.albumid && data.album.image && !$page.params.photoid) {
+            //We have not selected a photo from the album, select the albums image
+            goto('/album/' + $page.params.albumid + '/photo/' + data.album.image);
+        }
+
+    });
+    export let data;
+</script>
+
+<a href="/">
+    <div class="back-button">&lt;- Tilbake</div>
+</a>
+
+<slot></slot>
+
+<div class="photo-albums-area in-album">
+    <div class="grid-container">
+        {#each data.album.images as image}
+            <a href="/album/{data.album.id}/photo/{image}">
+                <div class="grid-item">
+                    <img class="grid-item-photo" src="/images/{image}">
+                </div>
+            </a>
+        {/each}
+    </div>
+</div>
+
+
+
+<style>
+    .back-button {
+        position: absolute;
+        top: 14px;
+        left: 14px;
+        background: #000;
+        color: #fff;
+        padding: 9px;
+        padding-left: 15px;
+        padding-right: 15px;
+        border-radius: 10px;
+        border: 2px solid #fff;
+    }
+
+    .in-album {
+        width: 100vw;
+        max-height: 20vh;
+        overflow-y: scroll;
+    }
+
+    .grid-container {
+        display: grid;
+        grid-template-columns: repeat(3, 30vw);
+        grid-gap: 3%;
+        margin-left: 1%;
+    }
+
+    .in-album .grid-container {
+        grid-template-columns: repeat(6, 16vw);
+        grid-gap: 1%;
+    }
+
+    .in-album .grid-item {
+        max-height: 17vh;
+        max-width: 16vw;
+    }
+
+    .in-album .grid-item img {
+        max-height: 17vh;
+        max-width: 16vw;
+        object-fit: cover;
+        object-position: center;
+    }
+
+    .grid-item img {
+        width: 30vw;
+        height: 20vh;
+        object-fit: cover;
+        transition: opacity 0.3s ease-in-out, transform 2s;
+    }
+
+    .grid-item {
+        width: 30vw;
+        height: 20vh;
+        transition: opacity 0.3s ease-in-out, transform 0.5s;
+        overflow: hidden;
+    }
+
+    .in-album .grid-item img {
+        max-height: 17vh;
+        max-width: 16vw;
+        object-fit: cover;
+        object-position: center;
+    }
+</style>
```
</details>

<details>
    <summary>/src/routes/album/[albumid]/+page.svelte</summary>

```diff
export let data;
 </script>
 
-<h1>Velkommen til {$page.params.albumid} albumet!</h1>
-
-<div class="full-image">
-    <img src="/images/{selectedImage}" />
-</div>
-
-<div class="photo-albums-area in-album">
-    <div class="grid-container">
-        {#each data.album.images as image}
-            <a href="/album/{data.album.id}/photo/{image}">
-                <div class="grid-item">
-                    <img class="grid-item-photo" src="/images/{image}">
-                </div>
-            </a>
-        {/each}
-    </div>
-</div>
-
-<style>
-    .full-image {
-        width: 100vw;
-        height: 75vh;
-        text-align: center;
-        margin-bottom: 5vh;
-    }
-
-    .full-image img {
-        max-width: 100%;
-        height: clamp(10vh, 1000px, 75vh);
-        object-fit: contain;
-        transition: all 0.5s;
-    }
-
-    .in-album {
-        width: 100vw;
-        max-height: 20vh;
-        overflow-y: scroll;
-    }
-
-    .grid-container {
-        display: grid;
-        grid-template-columns: repeat(3, 30vw);
-        grid-gap: 3%;
-        margin-left: 1%;
-    }
-
-    .in-album .grid-container {
-        grid-template-columns: repeat(6, 16vw);
-        grid-gap: 1%;
-    }
-
-    .in-album .grid-item {
-        max-height: 17vh;
-        max-width: 16vw;
-    }
-
-    .in-album .grid-item img {
-        max-height: 17vh;
-        max-width: 16vw;
-        object-fit: cover;
-        object-position: center;
-    }
-
-    .grid-item img {
-        width: 30vw;
-        height: 20vh;
-        object-fit: cover;
-        transition: opacity 0.3s ease-in-out, transform 2s;
-    }
-
-    .grid-item {
-        width: 30vw;
-        height: 20vh;
-        transition: opacity 0.3s ease-in-out, transform 0.5s;
-        overflow: hidden;
-    }
-
-    .in-album .grid-item img {
-        max-height: 17vh;
-        max-width: 16vw;
-        object-fit: cover;
-        object-position: center;
-    }
-
-
-</style>
```
</details>

<details>
    <summary>/src/routes/album/[albumid]/photo/[photoid]/+page.js</summary>

```diff
+export async function load({parent, params}) {
+    const data = await parent();
+    let album = await data.albums.find((album) => album.caption === params.albumid);
+    let photo = await data.photos.find((photo) => photo.id = params.photoid);
+
+    return { album: album, photo: photo};
+}
```
</details>

<details>
    <summary>/src/routes/album/[albumid]/photo/[photoid]/+page.svelte</summary>

```diff
+<script>
+    import {onMount} from "svelte";
+    import {page} from "$app/stores";
+
+    onMount(() => {
+
+    });
+
+    export let data;
+</script>
+
+<div class="full-image">
+    <img src="/images/{data.photo.id}" />
+</div>
+
+<style>
+    .full-image {
+        width: 100vw;
+        height: 75vh;
+        text-align: center;
+        margin-bottom: 5vh;
+    }
+
+    .full-image img {
+        max-width: 100%;
+        height: clamp(10vh, 1000px, 75vh);
+        object-fit: contain;
+        transition: all 0.5s;
+    }
+</style>
```
</details>

</td>
</tr>
</table>



<table>
<tr>
<th colspan="2">
<h2>Step 9: Adding an external library</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part9_slides.html" target="_blank">
        <img alt="Slide part 9" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part9_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Adding exifreader.js to read EXIF from photos
  - npm install exifreader --save-dev
- Adding a component to show EXIF data
- Use the browser import to only run markup in the browser
- Adding a new photo will all EXIF data present

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit: [4756228](https://github.com/joachimhs/svelteAlbumJZ23/commit/47562281a04c2c3b069b80aff1e7aba8db432d2e)

<details>
  <summary>/src/lib/components/ExifDetails.svelte</summary>

```diff
@@ -0,0 +1,135 @@
+<script>
+    import ExifReader from 'exifreader';
+    import {browser} from "$app/environment";
+    import {onMount} from "svelte";
+
+    export let photoElementId = null;
+    export let photo = null
+    let exifData = {};
+
+    onMount(async () => {
+        if (photoElementId) {
+            let img = document.getElementById(photoElementId);
+            const tags = await ExifReader.load(img.src, {includeUnknown: true});
+
+            exifData.shutter = tags.ExposureTime?.description;
+            exifData.exposureSetting = tags.ExposureBiasValue?.description;
+            exifData.focalLength = tags.FocalLength?.description;
+            exifData.iso = tags.ISOSpeedRatings?.description;
+            exifData.lens = tags.Lens?.description;
+            exifData.model = tags.Model?.description;
+            exifData.date = tags.DateTime?.description;
+            exifData.exposureMode = tags.ExposureMode?.description;
+            exifData.fstop = tags.ApertureValue ? parseFloat(tags.ApertureValue.description) : '';
+        }
+    });
+</script>
+
+{#if browser}
+    <div class="exif-info">
+        <div class="exif-info-label">
+            Vis Exif Info
+        </div>
+        <table>
+            <tbody>
+            <tr>
+                <td>Tittel</td>
+                <td>{photo.title}</td>
+            </tr>
+            <tr>
+                <td>Beskrivelse</td>
+                <td></td>
+            </tr>
+            <tr>
+                <td>Model</td>
+                <td>{exifData.model}</td>
+            </tr>
+
+            <tr>
+                <td>Linse</td>
+                <td>{exifData.lens}</td>
+            </tr>
+
+            <tr>
+                <td>Brennvidde</td>
+                <td>{exifData.focalLength}</td>
+            </tr>
+
+            <tr>
+                <td>Eksponeringstype</td>
+                <td>{exifData.exposureMode}</td>
+            </tr>
+
+            <tr>
+                <td>Blender</td>
+                <td>f/{exifData.fstop}</td>
+            </tr>
+
+            <tr>
+                <td>Lukkertid</td>
+                <td>{exifData.shutter}</td>
+            </tr>
+
+            <tr>
+                <td>ISO</td>
+                <td>{exifData.iso}</td>
+            </tr>
+
+            <tr>
+                <td>Exponering</td>
+                <td>{exifData.exposureSetting}</td>
+            </tr>
+
+            <tr>
+                <td>Dato</td>
+                <td>{exifData.date}</td>
+            </tr>
+            </tbody>
+        </table>
+    </div>
+{/if}
+
+<style>
+    .exif-info {
+        background: rgba(0,0,0, 0.65);
+        position: absolute;
+        top: 75px;
+        left: -476px;
+        color: white;
+        padding: 10px;
+        transition: all 0.5s;
+    }
+
+    .exif-info:hover {
+        left: 0;
+    }
+
+    .exif-info-label {
+        writing-mode: vertical-rl;
+        text-orientation: mixed;
+        float: right;
+        text-align: center;
+        padding-left: 10px;
+        height: fit-content;
+        padding-top: 90px;
+        letter-spacing: 1px;
+        font-family: sans-serif;
+    }
+
+    .exif-info table {
+        border: 1px solid rgba(255, 255, 255, 0.6);
+        padding: 5px;
+    }
+
+    .exif-info table td:nth-child(1) {
+        width: 50px;
+        overflow: visible;
+        padding-bottom: 10px;
+        padding-right: 30px;
+    }
+
+    .exif-info table td:nth-child(2) {
+        width: 300px;
+        overflow: visible;
+    }
+</style>
```
</details>
<details>
  <summary>/src/routes/+layout.js</summary>

```diff
export function load({ params }) {
    return {
        photos: [
            {
                id: 'IMGP4117.jpg',
                title: 'Valmue'
            },
            {
                id: 'background1.jpg',
                title: 'Tyttebær'
            },
            {
                id: 'IMGP4642.jpg',
                title: 'Tyttebær 2'
            },
             {
                 id: 'IMGP6801.jpg',
                 title: 'Sommerfugl'
+            },
+            {
+                id: 'IMGP3329.jpg',
+                title: 'Hvitveis'
             }
         ],
         ,
        albums: [
            {
                id: 'makro',
                image: 'IMGP4117.jpg',
                caption: 'makro',
-                images: ['IMGP4117.jpg', 'background1.jpg', 'IMGP4642.jpg', 'IMGP6801.jpg']
+                images: ['IMGP4117.jpg', 'background1.jpg', 'IMGP4642.jpg', 'IMGP6801.jpg', 'IMGP3329.jpg']
            },
            {
                id: 'norge2020',
                image: 'background1.jpg',
                caption: 'Norge 2020',
                images: ['IMGP4117.jpg', 'background1.jpg']
            }
        ]
    };
}
```
</details>
<details>
  <summary>src/routes/album/[albumid]/photo/[photoid]/+page.svelte</summary>

```diff
@@ -1,18 +1,15 @@
 <script>
-    import {onMount} from "svelte";
-    import {page} from "$app/stores";
-
-    onMount(() => {
-
-    });
+    import ExifDetails from "$lib/components/ExifDetails.svelte";
 
     export let data;
 </script>
 
 <div class="full-image">
-    <img src="/images/{data.photo.id}" />
+    <img id="photoAlbumImage" src="/images/{data.photo.id}" />
 </div>
 
+<ExifDetails photoElementId="photoAlbumImage" photo={data.photo}></ExifDetails>
+
 <style>
     .full-image {
        width: 100vw;
        height: 75vh;
        text-align: center;
        margin-bottom: 5vh;
    }

    .full-image img {
        max-width: 100%;
        height: clamp(10vh, 1000px, 75vh);
        object-fit: contain;
        transition: all 0.5s;
    }
</style>
```
</details>

</td>
</tr>
</table>




<table>
<tr>
<th colspan="2">
<h2>Step 10: Eek a bug!!</h2>
</th>
</tr>
<tr>
  <td>
    <a href="https://joachimhs.github.io/svelteAlbumJZ23/part10_slides.html" target="_blank">
        <img alt="Slide part 10" width="400" src="https://joachimhs.github.io/svelteAlbumJZ23/images/part10_cover.jpg">
    </a>
</td>
<td>

### Topics:

- Try to open the second photo-album and figure out why it is not working!
- Solution will be given in step 11 :)

</td>
</tr>
<tr>
<td colspan="2">

Changes made in commit:

<details>
  <summary></summary>

```diff
```
</details>

</td>
</tr>
</table>