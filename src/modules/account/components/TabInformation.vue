<template>
  <card-tab class="settings-information" :active="active">
    <form
      @submit.prevent="onFormSubmited()"
      class="settings-information space-y-10"
    >
      <div class="si-avatar relative">
        <avatar width="120px" height="120px" :username="user.username" />
        <span
          class="si-avatar-icon absolute bottom-0 left-20 cursor-pointer"
          @click="$refs.avatarFileInput.click()"
        >
          <input
            ref="avatarFileInput"
            type="file"
            class="hidden"
            @change="onAvatarUpdate($event.target)"
            accept="image/*"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 42 42"
          >
            <g id="PHOTO" transform="translate(-1035.623 -379.623)">
              <g
                transform="translate(1035.623 379.623)"
                fill="#e8e8e8"
                stroke="#fff"
                stroke-width="3"
              >
                <circle cx="21" cy="21" r="21" stroke="none" />
                <circle cx="21" cy="21" r="19.5" fill="none" />
              </g>
              <path
                d="M1.913,13A1.923,1.923,0,0,1,0,11.057V4.2A1.923,1.923,0,0,1,1.913,2.261h1.67L4.5.848A1.908,1.908,0,0,1,6.087,0H9.913A1.908,1.908,0,0,1,11.5.848l.922,1.413h1.67A1.923,1.923,0,0,1,16,4.2v6.853A1.923,1.923,0,0,1,14.087,13ZM3.687,7.03A4.313,4.313,0,1,0,8,2.667,4.346,4.346,0,0,0,3.687,7.03ZM12.539,4.4a.57.57,0,0,0,.539.6h.765a.556.556,0,0,0,.522-.6.568.568,0,0,0-.591-.548h-.7A.571.571,0,0,0,12.539,4.4ZM5.6,7.048A2.4,2.4,0,1,1,8,9.467,2.424,2.424,0,0,1,5.6,7.048Z"
                transform="translate(1048.623 393.623)"
                fill="#222"
              />
            </g>
          </svg>
        </span>
      </div>

      <div class="si-form flex flex-col space-y-4">
        <input-group id="name" title="Name">
          <input
            class="custom-input"
            name="name"
            placeholder="Name"
            v-model="user.name"
            maxlength="32"
          />
        </input-group>
        <input-group id="bio" title="Bio">
          <textarea
            class="custom-input"
            name="bio"
            placeholder="Bio"
            v-model="user.bio"
            maxlength="64"
          ></textarea>
        </input-group>
        <input-group id="location" title="Location">
          <input
            class="custom-input"
            name="location"
            placeholder="Location"
            v-model="user.location"
            maxlength="16"
          />
        </input-group>
        <input-group id="url" title="Url">
          <input
            class="custom-input"
            name="url"
            placeholder="Url"
            v-model="user.url"
            maxlength="64"
          />
        </input-group>

        <div class="si-group">
          <btn size="xl" class="active">Save</btn>
        </div>
      </div>
    </form>
  </card-tab>
</template>

<script>
import InputGroup from "./elements/InputGroup.vue";
import Avatar from "@/common/components/elements/Avatar.vue";
import Btn from "@/common/components/elements/button/Btn.vue";
import CardTab from "@/common/components/elements/CardTab.vue";

import { userGetters, userMethods } from "@/state/helpers";

export default {
  components: {
    CardTab,
    Avatar,
    InputGroup,
    Btn,
  },
  props: {
    active: {
      type: Boolean,
    },
  },
  data: () => ({
    user: {
      username: "null",
      name: null,
      bio: null,
      location: null,
      url: null,
    },
  }),
  computed: {
    ...userGetters,
  },
  methods: {
    ...userMethods,
    onFormSubmited() {
      this.updateProfile(this.user);
    },
    onAvatarUpdate(input) {
      this.updateAvatar(input.files[0]);
    },
  },
  beforeMount() {
    let user = this.getUser;

    Object.keys(this.user).forEach((key) => {
      if (user[key]) {
        this.user[key] = user[key];
      }
    });
  },
};
</script>
