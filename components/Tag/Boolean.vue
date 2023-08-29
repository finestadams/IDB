<template>
  <div>
    <span
      v-if="value"
      class="rounded-[16px] w-fit flex items-center justify-center gap-[6px] text-[14px] py-[4px] px-[12px] text-[#027A48] bg-[#ECFDF3]"
    >
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="3" fill="#12B76A" />
      </svg>
      {{ label || 'Passed' }}
    </span>
    <span
      v-else
      class="rounded-[16px] w-fit flex items-center justify-center gap-[6px] text-[14px] py-[4px] px-[12px] text-[#B42318] bg-[#FEF3F2]"
    >
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="3" fill="#F04438" />
      </svg>
      {{ label || 'Failed' }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'BooleanTag',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
  },
}
</script>
