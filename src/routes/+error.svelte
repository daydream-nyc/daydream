<script lang="ts">
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

	$: status = $page.status;
</script>

<svelte:head>
	<title>Error {status}</title>
</svelte:head>

<div class="min-h-screen w-full relative bg-gradient-to-b from-[#639DEB] to-[#8EC7F0] flex items-center justify-center">
	<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-10 bg-cover bg-no-repeat bg-position-[0_10vh] pointer-events-none"></div>
	
	<div class="absolute inset-0 bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
	
	<div class="relative z-10 text-center text-white flex flex-col">
		
        <h1 class="text-8xl font-serif text-white drop-shadow-lg">{status}</h1>
		<p class="text-2xl font-sans text-white mt-1">Something went wrong.</p>
		
        <a
            href="/"
            class="w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer mx-auto relative overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none mt-12"
        >
            Take me somewhere safe
            <img
                src="/button-clouds.svg" 
                alt="" 
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain pointer-events-none"
            >
        </a>
	</div>
</div>
