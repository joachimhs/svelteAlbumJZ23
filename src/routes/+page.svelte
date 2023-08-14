<script>

    import {onMount} from "svelte";

    export let data;

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
    {#each data.photos as photo}
        <div class="photo transparent" style="background-image: url('/images/{photo.id}')"/>
    {/each}
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