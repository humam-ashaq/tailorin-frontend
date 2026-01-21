<script lang="ts">
    import '../../app.css'; 
    let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
    
    <div class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-t-blue/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-t-pink/10 rounded-full blur-[120px]"></div>

    {@render children()}
</div>