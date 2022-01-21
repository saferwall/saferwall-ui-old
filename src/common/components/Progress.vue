<template>
  <div
    class="
      progress
      flex flex-col
      md:flex-row
      items-center
      justify-between
      gap-2
    "
  >
    <div
      class="flex md:flex-row flex-col items-center gap-4"
      :class="`type${getRateColor}`"
    >
      <div class="circle">
        <div
          class="z-50 flex flex-col items-center justify-center content-center"
        >
          <strong class="rate">{{ rate.value }}</strong>
          <span>/{{ rate.count }}</span>
        </div>
        <svg
          viewBox="0 0 36 36"
          :class="'absolute'"
          :height="radius * 2"
          :width="radius * 2"
        >
          <path
            class="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            stroke-dasharray="30, 100"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>

      <div class="message">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span>{{ message }}</span>
      </div>
    </div>

    <div class="submission flex items-center md:items-start flex-col gap-4">
      <strong class="uppercase text-gray"> First Submission </strong>
      <time class="font-bold">{{ getDateSubmission }}</time>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      default: "A certificate was explicitly revoked by its issuer",
      type: String,
    },
    submission: {
      default: Date.now() / 1000,
      type: Number,
    },
    radius: {
      default: 70,
      type: Number,
    },
    stroke: {
      default: 8,
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
    const progress = (props.rate.value / props.rate.count) * 100;

    return {
      progress,
    };
  },
  computed: {
    getDateSubmission() {
      let d = new Date(1970, 0, 1);
      d.setSeconds(this.submission);
      return "d/m/Y"
        .replace("Y", d.getFullYear())
        .replace("m", `${d.getMonth() + 1}`.padStart(2, "0"))
        .replace("d", `${d.getDate()}`.padStart(2, "0"));
    },
    getRateColor() {
      if (!this.classification || this.classification === "Label.UNKNOWN")
        return "warning";
      if (this.rate.value === 0) {
        return "success";
      }

      return "danger";
    },
  },
};
</script>

<style lang="scss" scoped>
.progress {
  .message {
    @apply flex  text-black font-bold;
  }
  .circle {
    @apply p-0 m-0 rounded-full  bg-light flex flex-col items-center justify-center content-center;

    height: 150px;
    width: 150px;
    min-width: 140px;

    .rate {
      @apply text-5xl;
    }
    span {
      @apply text-gray;
    }
    svg {
      @apply absolute stroke-primary;
    }
  }

  .submission {
    @apply px-5;
    @apply md:border-l md:border-gray-light;
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

svg .circle-bg {
  @apply stroke-gray-2xlight;

  fill: none;
  stroke-width: 3.8;
}

svg .circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
</style>
