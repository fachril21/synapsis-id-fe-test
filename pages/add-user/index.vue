<template>
  <div>
    <user-form @submit="onSubmit" />
  </div>
</template>

<script>
import UserForm from "~/components/UserForm.vue";
export default {
  components: { UserForm },
  head() {
    return {
      title: "Add User | " + process.env.TITLE,
    };
  },
  methods: {
    onSubmit(userData) {
      this.$store
        .dispatch("addUser", userData)
        .then(() => {
          this.$vs.notification({
            color: "success",
            position: "bottom-right",
            progress: "auto",
            title: "User data added successfully",
            text: "Yeay, your data is successfully stored safely!",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          this.$nuxt.error(error);
        });
    },
  },
};
</script>
