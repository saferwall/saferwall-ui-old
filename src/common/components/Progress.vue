<template>
  <div class="progress flex flex-col md:flex-row items-center justify-between gap-2">
    <div class="certificate" :class="`type${getRateColor}`">
      <div class="circle" v-if="rate">
        <div class="z-50 flex flex-col items-center justify-center content-center">
          <strong class="rate">{{ rate.value }}</strong>
          <span>/ {{ rate.count }}</span>
        </div>
        <svg viewBox="0 0 36 36" :class="'absolute'" :height="radius * 2" :width="radius * 2">
          <path
            class="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            :stroke-dasharray="progress + ', 100'"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>

      <div class="message" :class="`type${getRateColor}`">
        <span>{{ (rate && rate.value > 0 ? rate.value : 'No') + ' '+ message }}</span>
      </div>
    </div>

    <div class="submission">
      <div v-if="signature">
        <strong class="uppercase text-gray">SIGNATURE</strong>
        <time class="font-bold">{{ signature }}</time>
      </div>
      <div v-if="last_scanned">
        <strong class="uppercase text-gray">LAST SCANNED</strong>
        <time class="font-bold">{{ timeAgoCounts(last_scanned) }} ago</time>
      </div>
      <div v-if="first_seen">
        <strong class="uppercase text-gray">FIRST SUBMISSION</strong>
        <time class="font-bold">{{ timeAgoCounts(first_seen) }} ago</time>
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgoCounts } from "../utils/date-format";

export default {
  props: {
    message: {
      default: "antivirus venders flagged this file as malicious",
      type: String,
    },
    first_seen: { default: null, type: Number },
    last_scanned: { default: null, type: Number },
    signature: {
      type: String,
      default: null,
    },
    radius: {
      default: 60,
      type: Number,
    },
    stroke: {
      default: 5,
      type: Number,
    },
    rate: {
      default: { value: 9, count: 10 },
    },
    classification: {
      type: String,
      default: null,
    },
  },
  data(props) {
    const progress = Math.floor((props.rate.value / props.rate.count) * 100);

    return {
      progress,
    };
  },
  computed: {
    getRateColor() {
      if (!this.classification || this.classification === "Label.UNKNOWN")
        return "warning";
      if (this.rate.value === 0) {
        return "success";
      }

      return "danger";
    },
  },
  methods: {
    timeAgoCounts: timeAgoCounts,
  },
};
</script>

<style lang="scss" scoped>
.progress {
  .message {
    @apply flex w-full;
    color: #e63755;
    display: flex;
    width: 100%;
    color: #e63755;
    font-weight: 700;
    font-family: "Manrope";
    font-style: normal;
    max-width: 230px;
  }
  .circle {
    @apply p-0 m-0 rounded-full  bg-light flex flex-col items-center justify-center content-center;
    @apply h-36 w-36 min-w-36;

    .rate {
      @apply text-5xl;
      font-size: 2rem;
      font-weight: 700;
    }
    span {
      @apply text-gray;
      font-family: "Manrope";
      font-style: normal;
      font-weight: 600;
      font-size: 1rem;
      color: #a7a6a6;
    }
    svg {
      @apply absolute stroke-primary;
    }
  }

  .submission {
    @apply w-full px-5;
    @apply flex items-center justify-between;
    @apply md:items-start md:space-x-6  md:justify-end md:mt-0;

    > div {
      @apply flex flex-col space-y-2;
      @apply md:border-l-2 md:pl-4 border-gray-light;
    }
    strong {
      color: #b2b2b2;
      font-weight: 500;
    }
  }

  .typedanger {
    &,
    .circle {
      @apply stroke-danger;
    }
    @apply text-danger;
  }

  .typewarning {
    &,
    .circle {
      @apply stroke-warning;
    }
    @apply text-warning;
  }

  .typesuccess {
    &,
    .circle {
      @apply stroke-success;
    }
    @apply text-success;
  }
}

.certificate {
  @apply flex md:flex-row flex-col w-full items-center gap-4;
}

svg .circle-bg {
  @apply stroke-gray-2xlight;

  fill: none;
  stroke-width: 2;
}

svg .circle {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
</style>
