<script>
    import {page} from "$app/stores";
    import {onMount} from "svelte";

    let selectedImage = null;
    onMount(() => {
        selectedImage = data.album.image ? data.album.image : null;
    });
    export let data;
</script>

<h1>Velkommen til {$page.params.albumid} albumet!</h1>