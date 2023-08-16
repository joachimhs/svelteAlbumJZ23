<script>
    import {onMount} from "svelte";
    import {page} from "$app/stores";

    onMount(() => {

    });

    export let data;
</script>

<div class="full-image">
    <img src="/images/{data.photo.id}" />
</div>

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