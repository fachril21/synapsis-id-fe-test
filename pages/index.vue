<template>
  <div>
    <div class="flex flex-row justify-between items-center mb-8">
      <div class="text-2xl font-bold">List Users</div>
      <button
        class="bg-blue-500 px-4 py-2 rounded-xl text-white shadow-md hover:shadow-xl shadow-blue-500 transition-all ease-in-out duration-300 hover:bg-blue-600 focus:outline-none"
        @click="$router.push('/add-user')"
      >
        Add User
      </button>
    </div>
    <div id="listUsers">
      <table-users :data="loadedUsers" />
    </div>
  </div>
</template>

<script>
import TableUsers from "~/components/TableUsers.vue";
export default {
  components: { TableUsers },
  computed: {
    loadedUsers() {
      return this.$store.getters.loadedUsers;
    },
  },
};
</script>
