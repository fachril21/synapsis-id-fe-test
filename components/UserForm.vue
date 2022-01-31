<template>
  <div>
    <div class="flex flex-row justify-between items-center mb-8">
      <div class="text-2xl font-bold">Add Users</div>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-8">
        <div class="grid grid-cols-12 gap-8">
          <input-control
            class="col-span-12 sm:col-span-6"
            v-model="editedUser.first_name"
            placeholder="First Name"
            required
          >
            First Name
          </input-control>
          <input-control
            class="col-span-12 sm:col-span-6"
            v-model="editedUser.last_name"
            placeholder="Last Name"
            required
          >
            Last Name
          </input-control>
        </div>
        <input-control
          v-model="editedUser.email"
          placeholder="Email"
          control-type="email"
          required
        >
          Email
        </input-control>
        <input-control
          v-model="editedUser.phone"
          placeholder="Phone"
          control-type="phone"
          required
        >
          Phone
        </input-control>
        <input-control
          v-model="editedUser.address"
          placeholder="Address"
          control-type="textarea"
          required
        >
          Address
        </input-control>
        <div class="flex flex-row justify-between">
          <button
            @click="onCancel"
            class="flex justify-center items-center px-4 py-2 font-semibold text-sm shadow rounded-md text-red-500 hover:text-red-600 font-black border-2 border-red-500 hover:border-red-600 transition ease-in-out duration-150 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex justify-center items-center px-4 py-2 font-semibold text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-150 focus:outline-none"
          >
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span v-if="!loading"> Save </span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import InputControl from "~/components/InputControl.vue";
export default {
  components: { InputControl },
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      editedUser: this.user
        ? { ...this.user }
        : {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address: "",
          },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$emit("submit", this.editedUser);
    },
    onCancel() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
