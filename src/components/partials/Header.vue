<template>
    <nav class="navbar bg-white p-2 mt-0 fixed w-full z-10 top-0">
        <div class="mx-auto flex flex-wrap items-center">

            <div class="logo md:w-1/5 md:px-12 flex justify-center md:justify-start text-white font-extrabold">
                <a class="text-white no-underline hover:text-white hover:no-underline" href="#">
                    <img src="../../assets/imgs/logo.png" class="mh-10 max-h-14 w-auto p-1" alt="{{ appName }}">
                </a>
            </div>

            <div class="flex w-full ml-auto content-center justify-between md:w-1/2 md:justify-end">
                <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
                    <li class="mr-3">
                        <a class="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
                    </li>
                    <li class="mr-3">
                        <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">Hot Activities</a>
                    </li>
                    <li class="mr-3">
                        <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">Login</a>
                    </li>
                    <li class="mr-3">
                        <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">Sign Up</a>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
    computed : {
        appName(){
            return 'SaferWall';
        }
    }
}
</script>

<style lang="scss">
    $border-color: #EFEFEF;

    .navbar{
        border-bottom: 1px solid $border-color;
    }
    .logo {
        border-right: 1px solid $border-color;
        height: 100%;
    }
</style>
