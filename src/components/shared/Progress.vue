<template>
    <div class="progress grid grid-cols-10 gap-2">
      <div class="circle col-span-1">
        <strong class="rate">4</strong>
        <span>/60</span>
         <svg
            :height="radius * 2"
            :width="radius * 2"
          >
            <circle
              :stroke-dasharray="circumference + ' ' + circumference"
              :style="{ strokeDashoffset: strokeDashoffset }"
              :stroke-width="stroke"
              fill="transparent"
              :r="normalizedRadius"
              :cx="radius"
              :cy="radius"
            />
          </svg>
      </div>

      <div class="message col-span-5">
        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="22.645" height="22.645" viewBox="0 0 22.645 22.645">
          <g id="icon" transform="translate(-0.461 -0.732)">
            <text id="_" data-name="!" transform="translate(9.462 16.732)" fill="#e63755" font-size="14" font-family="OpenSans-Semibold, Open Sans" font-weight="600"><tspan x="0" y="0">!</tspan></text>
            <g transform="translate(0.461 0.732)" fill="none" stroke="#e63755" stroke-width="1.7">
              <circle cx="11.322" cy="11.322" r="11.322" stroke="none"/>
              <circle cx="11.322" cy="11.322" r="10.472" fill="none"/>
            </g>
          </g>
        </svg>

        {{ message }}
      </div>

      <div class="submission grid col-span-2">
        <strong class="uppercase">
          First Submission
        </strong>
        <time>{{ getDateSubmission }}</time>
      </div>

      <div class="buttons col-span-2">
        <Btn class="btn-circle h-20 w-20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="25.219" height="31.798" viewBox="0 0 25.219 31.798">
            <g transform="translate(0)">
              <path  d="M93.929,55.8H75.289A3.289,3.289,0,0,1,72,52.508V27.289A3.289,3.289,0,0,1,75.289,24H90.64l6.579,6.579V52.508A3.289,3.289,0,0,1,93.929,55.8Z" transform="translate(-72 -24)" fill="#ebedff"/>
              <path  d="M72,360H97.219v5.482a3.289,3.289,0,0,1-3.289,3.289H75.289A3.289,3.289,0,0,1,72,365.482Z" transform="translate(-72 -336.974)" fill="#3b3cb2"/>
              <path  d="M350.579,30.579h-3.289A3.289,3.289,0,0,1,344,27.289V24Z" transform="translate(-325.36 -24)" fill="#8c8ac9"/>
              <path  d="M180.061,126.579v-2.193h-2.353a3.817,3.817,0,0,0-.3-.729l1.663-1.663-1.551-1.551-1.663,1.663a3.816,3.816,0,0,0-.729-.3V120h-2.193v1.8a3.815,3.815,0,0,0-.729.3l-1.663-1.663-1.551,1.551,1.663,1.663a3.817,3.817,0,0,0-.3.729H168v2.193h2.353a3.817,3.817,0,0,0,.3.729l-1.663,1.663,1.551,1.551,1.663-1.663a3.815,3.815,0,0,0,.729.3v1.8h2.193v-1.8a3.816,3.816,0,0,0,.729-.3l1.663,1.663,1.551-1.551-1.663-1.663a3.816,3.816,0,0,0,.3-.729Zm-6.031.548a1.645,1.645,0,1,1,1.645-1.645A1.645,1.645,0,0,1,174.031,127.127Z" transform="translate(-161.421 -113.421)" fill="#8c8ac9"/>
              <path  d="M152,216h14.254v5.482H152Z" transform="translate(-146.518 -202.842)" fill="#babdeb"/>
              <g  transform="translate(6.579 14.802)">
                <path  d="M220.934,241.1h-4.386a.548.548,0,0,1,0-1.1h4.386a.548.548,0,1,1,0,1.1Z" transform="translate(-212.711 -240)" fill="#fff"/>
                <path  d="M170.741,385.1a.548.548,0,1,0,0-1.1h-2.193a.548.548,0,0,0-.548.548v4.386a.548.548,0,0,0,.548.548h2.193a.548.548,0,0,0,0-1.1H169.1v-1.1h.548a.548.548,0,0,0,0-1.1H169.1v-1.1Z" transform="translate(-168 -374.132)" fill="#fff"/>
                <path  d="M298.741,385.1a.548.548,0,1,0,0-1.1h-2.193a.548.548,0,0,0-.548.548v4.386a.548.548,0,0,0,.548.548h2.193a.548.548,0,0,0,0-1.1H297.1v-1.1h.548a.548.548,0,0,0,0-1.1H297.1v-1.1Z" transform="translate(-287.228 -374.132)" fill="#fff"/>
                <path  d="M234.985,384.056a.548.548,0,0,0-.736.245l-.606,1.212-.606-1.212a.548.548,0,0,0-.981.49l.974,1.948-.974,1.948a.548.548,0,1,0,.981.49l.606-1.212.606,1.212a.548.548,0,1,0,.981-.49l-.974-1.948.974-1.948A.548.548,0,0,0,234.985,384.056Z" transform="translate(-227.612 -374.13)" fill="#fff"/>
              </g>
            </g>
          </svg>
        </Btn>
        <Btn class="btn-circle h-20 w-20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="25.303" height="28.114" viewBox="0 0 25.303 28.114">
            <path d="M12.686,26.274V17.84a.94.94,0,0,1,.937-.937H29.554V8.937A.94.94,0,0,0,28.617,8H14.091v4.686a.937.937,0,0,1-.937.937H8V34.24a.94.94,0,0,0,.937.937h19.68a.94.94,0,0,0,.937-.937V27.211H13.623A.94.94,0,0,1,12.686,26.274Zm0,0" transform="translate(-7.531 -7.531)" fill="#9bc9ff"/>
            <g >
              <path d="M23.9,8.9H22.492v-7.5A1.406,1.406,0,0,0,21.086,0H6.56c-.01,0-.018,0-.028.005A.474.474,0,0,0,6.42.026L6.376.04a.461.461,0,0,0-.134.084L.151,5.748a.455.455,0,0,0-.1.14.43.43,0,0,0-.018.047.46.46,0,0,0-.027.131c0,.01-.006.019-.006.029V26.709a1.406,1.406,0,0,0,1.406,1.406h19.68a1.406,1.406,0,0,0,1.406-1.406v-6.56H23.9A1.406,1.406,0,0,0,25.3,18.743V10.309A1.406,1.406,0,0,0,23.9,8.9ZM6.091,1.539V5.154a.469.469,0,0,1-.469.469H1.667Zm15.463,25.17a.469.469,0,0,1-.469.469H1.406a.469.469,0,0,1-.469-.469V6.56H5.623A1.406,1.406,0,0,0,7.029,5.154V.937H21.086a.469.469,0,0,1,.469.469V8.9H6.091a1.406,1.406,0,0,0-1.406,1.406v8.434a1.406,1.406,0,0,0,1.406,1.406H21.554Zm2.811-7.966a.469.469,0,0,1-.469.469H6.091a.469.469,0,0,1-.469-.469V10.309a.469.469,0,0,1,.469-.469H23.9a.469.469,0,0,1,.469.469Zm0,0" transform="translate(0)" fill="#1e81ce"/>
              <path d="M122.343,192h-1.874a.469.469,0,0,0-.469.469v5.623a.469.469,0,0,0,.469.469h1.874a2.346,2.346,0,0,0,2.343-2.343v-1.874A2.346,2.346,0,0,0,122.343,192Zm1.406,4.217a1.406,1.406,0,0,1-1.406,1.406h-1.406v-4.686h1.406a1.406,1.406,0,0,1,1.406,1.406Zm0,0" transform="translate(-112.971 -180.754)" fill="#1e81ce"/>
              <path d="M220.217,197.623h-3.28v-5.154a.469.469,0,1,0-.937,0v5.623a.469.469,0,0,0,.469.469h3.749a.469.469,0,0,0,0-.937Zm0,0" transform="translate(-203.349 -180.754)" fill="#1e81ce"/>
              <path d="M316.217,197.623h-3.28v-5.154a.469.469,0,1,0-.937,0v5.623a.469.469,0,0,0,.469.469h3.749a.469.469,0,0,0,0-.937Zm0,0" transform="translate(-293.726 -180.754)" fill="#1e81ce"/>
            </g>
          </svg>
        </Btn>
      </div>
    </div>
</template>

<script>
import Btn from "@/components/shared/partials/button/Button.vue"
export default {
    components: { Btn },
    props: {
        message:  {
            default:'A certificate was explicitly revoked by its issuer' ,
            type: String
        },
        submission: {
            default: Date.now(), 
            type:Number
        },
        radius: {
            default: 70 , 
            type:Number
        },
        progress: {
            default: 68 , 
            type:Number
        },
        stroke: {
            default: 8 , 
            type:Number
        },
    },
    data() {
        const normalizedRadius = this.radius - this.stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        
        return {
            normalizedRadius,
            circumference
        };
    },
    computed: {
        strokeDashoffset() {
            return this.circumference - (this.progress) / 100 * this.circumference;
        },
        getDateSubmission(){
            let d = new Date(1970, 0, 1);
            d.setSeconds(this.submission/1000);
            return 'd/m/Y'.replace('Y', d.getFullYear())
                .replace('m', `${d.getMonth()+1}`.padStart(2,'0'))
                .replace('d', `${d.getDate()}`.padStart(2,'0'));
        }
    }
}
</script>

<style lang="scss" scoped>
.progress{
    @apply content-center items-center;


    .message {
      @apply flex text-danger font-bold pl-4;
    }
    .circle{
      @apply p-0 m-0 rounded-full w-36 h-36 bg-light grid items-center content-center justify-center;

      .rate {
        @apply text-3xl;
      }
      span{
        @apply text-gray;
      }
      svg{
        @apply absolute stroke-primary;
      }
    }
    
    .btn-circle{
      @apply p-0 m-0 h-20 w-20 rounded-full;
    }

    .buttons {
      @apply flex items-end content-end justify-end;

      .btn{
        @apply mr-6;
      }
    }

    .submission{
        @apply px-10;
        border-left: $border-color 1.5px solid;
        border-right: $border-color 1.5px solid;
    }

  }
</style>