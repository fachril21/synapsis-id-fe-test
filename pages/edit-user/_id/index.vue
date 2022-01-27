<template>
  <div>
    <user-form :user="loadedUser" @submit="onSubmit" />
  </div>
</template>

<script>
import UserForm from "~/components/UserForm.vue";
import axios from "axios";
export default {
  components: { UserForm },
  asyncData(context) {
    return axios
      .post(
        "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/findOne",
        {
          collection: "users",
          database: "synapsis",
          dataSource: "Cluster0",
          filter: {
            _id: { $oid: context.params.id },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "api-key": process.env.VUE_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        return { loadedUser: res.data.document };
      });
  },
  methods: {
    onSubmit(userData) {
      this.$store
        .dispatch("editUser", userData)
        .then(() => {
          this.$vs.notification({
            color: "success",
            position: "bottom-right",
            title: "User data edited successfully",
            text: "Yeay, your data is successfully stored safely!",
          });
          this.$router.push("/");
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
