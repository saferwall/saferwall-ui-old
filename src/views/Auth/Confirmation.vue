<template>
<div class="auth-card">
    <message v-if="sent" icon="mail" title="Confirm your registration" message="We’ve sent a link to the email you specified." button="Check my email" />
    <message v-else-if="confirmed" title="Congratulation !" message="Your registration has been confirmed." button="Login" />
    <form v-else method="POST" class="w-full">
        <div class="header flex flex-col space-y-4 my-3">
            <h2 class="title text-3xl font-semibold">
                Didn’t confirm registration ?
            </h2>
            <p class="text-gray-medium">
                Enter your account email address and we’ll <br> send you a link to confirm your email.
            </p>
        </div>
        <div class="content mt-8 mb-16">
            <div class="form-group w-full my-4">
                <input type="text" class="form-input" placeholder="Email">
            </div>
            <div class="form-group">
                <button class="btn-submit">
                    Send Confirmation
                </button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import Message from './Message.vue'
export default {
    data(){ 
        return  {
            sent : false,
            confirmed: false,
        }
    },
    components : {
        Message
    }
}
</script>
