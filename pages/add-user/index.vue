<template>
  <div>
    <user-form @submit="onSubmit" />
  </div>
</template>

<script>
import UserForm from "~/components/UserForm.vue";
export default {
  components: { UserForm },
  methods: {
    onSubmit(userData) {
      this.$store
        .dispatch("addUser", userData)
        .then(() => {
          this.$vs.notification({
            color: "success",
            position: "top-right",
            title: "User data added successfully",
            text: "Yeay, your data is successfully stored safely!",
          });
          this.$router.push("/");
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
