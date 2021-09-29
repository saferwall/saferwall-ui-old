<template>
  <div class="progress grid grid-cols-11 gap-2">
    <div
      class="flex md:flex-row flex-col items-center col-span-6"
      :class="`type${getRateColor}`"
    >
      <div class="circle">
        <strong class="rate">{{ rate.value }}</strong>
        <span>/{{ rate.count }}</span>
        <svg :height="radius * 2" :width="radius * 2" class="circle-rate">
          <circle
            :class="`type${getRateColor}`"
            :stroke-dasharray="circumference + ' ' + circumference"
            :style="{ strokeDashoffset: strokeDashoffset }"
            :stroke-width="stroke"
            fill="rgba(25,25,25,0.05)"
            :r="normalizedRadius"
            :cx="radius"
            :cy="radius"
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

    <div class="submission grid col-span-5">
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
  },
  data(props) {
    const normalizedRadius = this.radius - this.stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = (props.rate.value / props.rate.count) * 100;

    return {
      normalizedRadius,
      circumference,
      progress,
    };
  },
  computed: {
    strokeDashoffset() {
      return this.circumference - (this.progress / 100) * this.circumference;
    },
    getDateSubmission() {
      let d = new Date(1970, 0, 1);
      d.setSeconds(this.submission);
      return "d/m/Y"
        .replace("Y", d.getFullYear())
        .replace("m", `${d.getMonth() + 1}`.padStart(2, "0"))
        .replace("d", `${d.getDate()}`.padStart(2, "0"));
    },
    getRateColor() {
      const percentages = [
        [0, 30, "success"],
        [30, 60, "warning"],
        [60, 100, "danger"],
      ];
      let p = this.progress;

      return (percentages.find((item) => {
        return p >= item[0] && p < item[1];
      }) || percentages[2])[2];
    },
  },
};
</script>

<style lang="scss" scoped>
.progress {
  @apply content-center items-center;

  .message {
    @apply flex text-danger font-bold;
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

  .btn-circle {
    @apply p-0 m-0 h-20 w-20 rounded-full;
  }

  .buttons {
    @apply flex items-end content-end justify-end;

    .btn {
      @apply mr-6;
    }
  }

  .submission {
    @apply px-10;
    border-left: $border-color 1.5px solid;
    border-right: $border-color 1.5px solid;
  }

  .typedanger {
    @apply stroke-danger text-danger;
  }

  .typewarning {
    @apply stroke-warning text-warning;
  }

  .typesuccess {
    @apply stroke-success text-success;
  }
}
</style>
