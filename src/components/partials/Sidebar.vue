<template>
  <aside class="z-50 z-40 w-full inest-navbar h-screen fixed bg-white">
    <div class="logo">
      <logo />
    </div>

    <div class="menu">
      <ul class="content">
        <li class="">
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22.835"
              height="17.507"
              viewBox="0 0 22.835 17.507"
            >
              <g transform="translate(0 0)">
                <g>
                  <path
                    d="M19.025,60.812A7.866,7.866,0,0,0,9.5,55.264a7.7,7.7,0,0,0-5.917,6.854A4.18,4.18,0,0,0,.058,66.905,4.249,4.249,0,0,0,4.3,70.394H7.866V69H4.3a2.778,2.778,0,1,1,0-5.555.7.7,0,0,0,.714-.694A6.337,6.337,0,0,1,11.427,56.5a6.38,6.38,0,0,1,6.307,5.04.706.706,0,0,0,.606.555,3.488,3.488,0,0,1,3.029,3.926A3.537,3.537,0,0,1,17.855,69H15v1.389h2.854a4.848,4.848,0,0,0,1.17-9.582Z"
                    transform="translate(0 -55.032)"
                    fill="#c3c3c3"
                  />
                  <path
                    d="M183.9,249.219l-2.86,2.86,1.008,1.008,1.645-1.637v6.857h1.43V251.45l1.637,1.637,1.008-1.008-2.86-2.86A.715.715,0,0,0,183.9,249.219Z"
                    transform="translate(-172.969 -240.8)"
                    fill="#c3c3c3"
                  />
                </g>
              </g>
            </svg>

            Browse files
          </router-link>
        </li>

        <li class="active">
          <router-link to="/summary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.085"
              height="18.809"
              viewBox="0 0 21.085 18.809"
            >
              <g
                transform="translate(0.19 -27.632)"
                style="isolation: isolate"
              >
                <g
                  transform="translate(-0.001 27.798)"
                >
                  <g
                    transform="translate(0 0)"
                  >
                    <path
                      d="M20.524,35.1l-9.834-7.2a.539.539,0,0,0-.637,0L.22,35.1a.539.539,0,1,0,.637.87L10.372,29l9.515,6.967a.539.539,0,0,0,.637-.87Z"
                      transform="translate(0.001 -27.797)"
                      fill="#c3c3c3"
                      stroke="#c3c3c3"
                      stroke-width="0.3"
                    />
                  </g>
                </g>
                <g
                  transform="translate(2.287 36.093)"
                >
                  <g  >
                    <path
                      id="Tracé_21"
                      d="M72.084,232.543a.539.539,0,0,0-.539.539v8.58H67.233v-4.683a2.7,2.7,0,1,0-5.391,0v4.683H57.53v-8.58a.539.539,0,0,0-1.078,0V242.2a.539.539,0,0,0,.539.539h5.39a.539.539,0,0,0,.537-.5.4.4,0,0,0,0-.042v-5.222a1.617,1.617,0,1,1,3.235,0V242.2a.4.4,0,0,0,0,.042.539.539,0,0,0,.537.5h5.39a.539.539,0,0,0,.539-.539v-9.119A.539.539,0,0,0,72.084,232.543Z"
                      transform="translate(-56.452 -232.543)"
                      fill="#c3c3c3"
                      stroke="#c3c3c3"
                      stroke-width="0.3"
                    />
                  </g>
                </g>
              </g>
            </svg>

            Static Analysis
          </router-link>
        </li>
      </ul>

      <btn class="mx-auto mt-12">
        <strong>Back to website</strong>
      </btn>
    </div>
  </aside>
</template>

<script>
import Logo from "@/components/shared/elements/Logo.vue";
import Btn from "@/components/shared/elements/button/Button.vue";

export default {
  name: "Sidebar",
  components: { Logo, Btn },
};
</script>

<style lang="scss" scoped>
.sidebar {
  @apply inset-0;
  border-right: solid 1px $border-color;

  .logo {
    @apply w-full h-navbar max-h-20 md:w-sidebar md:px-6 px-5 flex justify-center md:justify-start text-black font-extrabold;
  }

  .menu {
    @apply w-full mt-8;

    .content {
      @apply mb-auto;

      li {
        a {
          @apply text-lg text-black flex items-center gap-4 py-4 my-1 p-4 w-9/10 rounded-r-md;
        }
        &.active a,
        a:hover {
          @apply bg-primary bg-opacity-5 text-primary;

          svg {
            display: none;
          }

          &::before {
            @apply bg-primary rounded-full;
            content: " ";
            display: block;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
