<template>
<div class="auth-card">
    <form method="POST" class="w-full">
        <div class="header flex my-3">
            <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="41.96" height="41.961" viewBox="0 0 41.96 41.961">
                <g id="add-user" transform="translate(0)" style="isolation: isolate">
                    <g id="Groupe_29" data-name="Groupe 29" transform="translate(0)">
                        <g id="Groupe_28" data-name="Groupe 28" transform="translate(0)">
                            <path id="Tracé_50" data-name="Tracé 50" d="M30.124,21.055a21.326,21.326,0,0,0-2.466-.99,11.146,11.146,0,1,0-13.346.007A21.319,21.319,0,0,0,.107,35.955a4.98,4.98,0,0,0,4.868,6.005H25.16a1.639,1.639,0,1,0,0-3.278H4.974a1.665,1.665,0,0,1-1.311-.623,1.712,1.712,0,0,1-.347-1.436,18.11,18.11,0,0,1,17.23-14.34q.216.008.435.008t.439-.009a17.854,17.854,0,0,1,7.3,1.733,1.639,1.639,0,0,0,1.407-2.961ZM21.38,19q-.2,0-.4,0t-.4,0a7.868,7.868,0,1,1,.8,0Z" transform="translate(0)" fill="#0d9677" />
                        </g>
                    </g>
                    <g id="Groupe_31" data-name="Groupe 31" transform="translate(26.39 26.389)">
                        <g id="Groupe_30" data-name="Groupe 30">
                            <path id="Tracé_51" data-name="Tracé 51" d="M335.932,328.147h-4.507v-4.507a1.639,1.639,0,1,0-3.278,0v4.507h-4.507a1.639,1.639,0,1,0,0,3.278h4.507v4.507a1.639,1.639,0,0,0,3.278,0v-4.507h4.507a1.639,1.639,0,0,0,0-3.278Z" transform="translate(-322 -322)" fill="#0d9677" />
                        </g>
                    </g>
                </g>
            </svg>

            <h2 class="title text-3xl font-semibold">
                Sign Up
            </h2>
        </div>
        <div class="content mt-8">
            <div class="form-group w-full my-4">
                <input type="text" class="form-input" placeholder="Username">
            </div>
            <div class="form-group w-full my-4">
                <input type="email" class="form-input" placeholder="Email">
            </div>
            <div class="form-group justify-end">
                <input type="password" class=" form-input" placeholder="Password">
                <span class="show absolute align-self-end  mx-3 py-3 pt-4 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26.231" height="22" viewBox="0 0 26.231 22">
                        <image width="26.231" height="22" xlink:href="data:image/png;base64,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" />
                    </svg>
                </span>
            </div>
            <div class="form-group justify-between py-2">
                <label for="agree">
                    <input type="checkbox" name="agree" id="agree"> I agree to the <router-link to="#">Terms of Service</router-link>
                </label>
            </div>
            <div class="form-group">
                <button class="btn-submit">
                    Create account
                </button>
            </div>
            <div class="form-group justify-center pt-3">
                Already have an account ? <router-link class="text-primary font-bold mx-2" to="/auth/login">Login</router-link>
            </div>
        </div>
    </form>
</div>
</template>

<script>
export default {
    name: 'Home',
    components: {}
}
</script>
