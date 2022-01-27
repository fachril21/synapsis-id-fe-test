<template>
  <vs-dialog width="550px" not-center v-model="active" v-on:close="onClose">
    <template #header>
      <div
        class="text-xl font-bold flex flex-row flex-wrap items-center justify-center gap-2 pt-8 px-4"
      >
        <div
          class="w-10 h-10 bg-red-200 flex items-center justify-center rounded-full"
        >
          <i class="bx bx-trash-alt text-red-700"></i>
        </div>
        Are you sure you want to delete {{ user.first_name }}
        {{ user.last_name }}?
      </div>
    </template>

    <div class="flex justify-center py-8">
      <p>Once the data is deleted, the data cannot be restored</p>
    </div>

    <template #footer>
      <div class="flex flex-row justify-end">
        <vs-button @click="onClose" dark transparent class="font-bold">
          Cancel
        </vs-button>
        <vs-button
          @click="onDelete"
          color="#f56565"
          transparent
          class="font-bold"
        >
          Delete User
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      active: true,
      userData: this.user,
    };
  },
  methods: {
    onClose() {
      this.$emit("handleClose", null);
    },
    onDelete() {
      this.$emit("deleteData", this.userData);
      this.$emit("handleClose", null);
    },
  },
};
</script>
