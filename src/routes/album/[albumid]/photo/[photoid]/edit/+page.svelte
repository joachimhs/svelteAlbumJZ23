<script>
    import {storePhoto} from "$lib/stores/photoStore.js";
    import {browser} from "$app/environment";
    import { enhance } from '$app/forms';

    export let data;
    let inFlight = false;

    async function savePhoto() {
        inFlight = true;
        await storePhoto(data.photo);
        inFlight = false;
    }
</script>

{#if browser}
    <div class="edit-area">
        <div class="edit-image">
            <img id="photoAlbumImage" src="/images/{data.photo.id}" />
        </div>


        <form class="edit-form" on:submit|preventDefault={savePhoto}>
            {#if inFlight}
                <div>Lagrer...</div>
            {:else}
                <div>ID: </div>
                <input type="text" disabled bind:value={data.photo.id} />
                <div>Title: </div>
                <input type="text" bind:value={data.photo.title} />
                <div class="form-buttons">
                    <button on:click={savePhoto}>Lagre</button>
                </div>
            {/if}
        </form>

    </div>
{/if}

<style>
    .edit-area {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 50px;
        margin-top: 100px;
    }

    .edit-form {
        display: grid;
        grid-template-columns: 100px 1fr;
        grid-auto-rows: 45px;
        margin-left: 25px;
    }

    .edit-form .form-buttons {
        grid-column: 2;
        text-align: center;
        padding-top: 5px;
    }

    .form-buttons button {
        border: 1px solid #4771b9;
        background-color: #4771b9;
        color: #fff;
        padding: 0px 35px;
        text-align: center;
        height: 35px;
        max-height: 40px;
        line-height: 35px;
        display: inline-block;
        cursor: pointer;
    }

    .edit-image {
        width: 100%;
        text-align: center;
    }

    .edit-image img {
        max-width: 100%;
        object-fit: contain;
        transition: all 0.5s;
    }
</style>