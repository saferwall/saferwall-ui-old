<template>
  <div class="uploadfile shadow">
    <h1 class="welcome mt-8 ml-10 mb-auto w-full">Welcome to Saferwall !</h1>
    <div class="upload">
      <input v-bind="getInputProps()" type="file" class="hide" @change="inputFileChanged" />
      <button class="btn-upload" v-bind="getRootProps()" v-if="loggedIn">
        Browse Files
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 w-6 h-6" viewBox="0 0 33.3 25.53">
            <g fill="#fff" style="isolation:isolate">
              <path d="M27.75 8.43a11.47 11.47 0 0 0-13.9-8.1 11.23 11.23 0 0 0-8.62 10 6.1 6.1 0 0 0-5.15 6.99 6.2 6.2 0 0 0 6.19 5.08h5.2v-2.02h-5.2a4.05 4.05 0 1 1 0-8.1 1.03 1.03 0 0 0 1.04-1.01 9.24 9.24 0 0 1 9.36-9.12 9.3 9.3 0 0 1 9.2 7.35 1.03 1.03 0 0 0 .88.8 5.09 5.09 0 0 1 4.42 5.73 5.16 5.16 0 0 1-5.13 4.35h-4.16v2.03h4.16a7.07 7.07 0 0 0 1.7-13.98Z"/>
              <path d="m15.94 12.28-4.18 4.17 1.47 1.47 2.4-2.39v10h2.09v-10l2.39 2.39 1.47-1.47-4.17-4.17a1.04 1.04 0 0 0-1.47 0Z"/>
            </g>
          </svg>
      </button>
      <div v-else class="flex">
        <router-link to="/auth/login" class="btn-upload">
          Sign in to Upload
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 w-6 h-6" viewBox="0 0 33.3 25.53">
              <g fill="#fff" style="isolation:isolate">
                <path d="M27.75 8.43a11.47 11.47 0 0 0-13.9-8.1 11.23 11.23 0 0 0-8.62 10 6.1 6.1 0 0 0-5.15 6.99 6.2 6.2 0 0 0 6.19 5.08h5.2v-2.02h-5.2a4.05 4.05 0 1 1 0-8.1 1.03 1.03 0 0 0 1.04-1.01 9.24 9.24 0 0 1 9.36-9.12 9.3 9.3 0 0 1 9.2 7.35 1.03 1.03 0 0 0 .88.8 5.09 5.09 0 0 1 4.42 5.73 5.16 5.16 0 0 1-5.13 4.35h-4.16v2.03h4.16a7.07 7.07 0 0 0 1.7-13.98Z"/>
                <path d="m15.94 12.28-4.18 4.17 1.47 1.47 2.4-2.39v10h2.09v-10l2.39 2.39 1.47-1.47-4.17-4.17a1.04 1.04 0 0 0-1.47 0Z"/>
              </g>
            </svg>
        </router-link>
      </div>
      <div class="progress" v-if="isUploading">
        <k-progress
          class="k"
          active
          active-color="white"
          color="#0d9677"
          :percent="uploadProgress"
          status="success"
          :line-height="8"
          :show-text="false"
        ></k-progress>
        <p class="text">
          {{ getStep }}
          <strong>
            (
            <span class="value">{{ uploadProgress }}</span>%)
          </strong>
        </p>
      </div>
      <div class="messages">
        <div v-if="isDragReject" id="isDragReject">isDragReject: {{ isDragReject }}</div>
      </div>
    </div>
    <p class="terms">
      By using Saferwall you consent to our
      <a
        target="_blank"
        href="https://docs.saferwall.com/tos"
      >Terms of Service</a>
      and
      <a href="https://docs.saferwall.com/privacy">Privacy Policy</a> and
      allow us to share your submission with the security community.
    </p>
  </div>
</template>

<script>
import { useDropzone } from "vue3-dropzone";
import { uploadMethods, uploadGetters, authGetters } from "@/state/helpers";

export default {
  setup() {
    const { getRootProps, getInputProps, ...rest } = useDropzone();

    return {
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
  computed: {
    ...uploadGetters,
    ...authGetters
  },
  methods: {
    ...uploadMethods,
    async inputFileChanged(event) {
      await this.uploadFile(event.target.files[0]);
      this.$router.push("/file/" + this.getFile.sha256 + "?n=1");
    },
  },
};
</script>



<style lang="scss" scoped>
.uploadfile {
  @apply md:mt-14 flex flex-wrap mx-auto rounded-lg bg-white  w-full min-h-7/10 lg:min-h-7/10;

  .hide {
    @apply hidden;
  }
  a {
    color: $text-color;
  }
  .welcome {
    @apply pt-4 text-xl font-bold;
    font-weight: 500;
    font-size: 1.5rem;
  }
  .btn-upload {
    @apply focus:outline-none flex bg-primary text-white py-5 px-6 rounded-md  m-auto;
    font-weight: 600;
  }
  .btn-disabled {
    @apply bg-gray opacity-30;
  }

  .upload {
    @apply w-full m-auto;
  }

  .progress {
    @apply m-auto my-8 w-7/12 block;

    .text {
      @apply mx-auto mt-3 w-max;
    }
  }

  .terms {
    @apply text-sm text-center w-8/12 mb-10 mt-auto mx-auto;
    font-size: 1.1rem;
    line-height: 1.5rem;
    font-weight: 500;
  }
}
</style>


<style >
.k-progress-outer {
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
}
</style>