import axios from "axios";

export const state = () => ({
  loadedUsers: [],
});

export const mutations = {
  setUsers(state, users) {
    state.loadedUsers = users;
  },
  addUser(state, user) {
    state.loadedUsers.unshift(user);
  },
  editUser(state, editedUser) {
    const userIndex = state.loadedUsers.findIndex(
      (user) => user._id === editedUser._id
    );
    state.loadedUsers[userIndex] = editedUser;
  },
  deleteUser(state, deletedUser) {
    const userIndex = state.loadedUsers.findIndex(
      (user) => user._id === deletedUser._id
    );
    state.loadedUsers.splice(userIndex, 1);
  },
  deleteManyUsers(state, deletedUsers) {
    for (const key in deletedUsers) {
      const userIndex = state.loadedUsers.findIndex(
        (user) => user._id === deletedUsers[key]
      );
      state.loadedUsers.splice(userIndex, 1);
    }
  },
  setLoading(state, status) {
    state.loading = status;
  },
};

export const actions = {
  //Get data for first load. This method run in server.
  nuxtServerInit({ commit }, context) {
    return axios
      .post(
        "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/find",
        {
          collection: "users",
          database: "synapsis",
          dataSource: "Cluster0",
          sort: {
            updatedAt: -1,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "api-key": process.env.VUE_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        const usersArray = [];
        for (const key in res.data.documents) {
          usersArray.push(res.data.documents[key]);
        }
        commit("setUsers", usersArray);
      })
      .catch((e) => context.error(e));
  },

  //Method for adding user.
  addUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/insertOne",
          {
            collection: "users",
            database: "synapsis",
            dataSource: "Cluster0",
            document: { ...user, updatedAt: new Date() },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "Access-Control-Allow-Origin": "*",
              "api-key": process.env.VUE_APP_API_KEY,
            },
          }
        )
        .then((res) => {
          resolve(commit("addUser", { _id: res.data.insertedId, ...user }));
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //Method for editing user.
  editUser({ commit }, editedUser) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/updateOne",
          {
            collection: "users",
            database: "synapsis",
            dataSource: "Cluster0",
            filter: { _id: { $oid: editedUser._id } },
            update: {
              $set: {
                first_name: editedUser.first_name,
                last_name: editedUser.last_name,
                email: editedUser.email,
                phone: editedUser.phone,
                address: editedUser.address,
                updatedAt: new Date(),
              },
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "Access-Control-Allow-Origin": "*",
              "api-key": process.env.VUE_APP_API_KEY,
            },
          }
        )
        .then((res) => {
          resolve(commit("editUser", editedUser));
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //Method for deleting user.
  deleteUser({ commit }, deletedUser) {
    return new Promise((resolve, reject) => {
      const loader = this._vm.$vs.loading({
        background: "#ebf8ff",
        color: "#4299e1",
      });
      axios
        .post(
          "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/deleteOne",
          {
            collection: "users",
            database: "synapsis",
            dataSource: "Cluster0",
            filter: { _id: { $oid: deletedUser._id } },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "Access-Control-Allow-Origin": "*",
              "api-key": process.env.VUE_APP_API_KEY,
            },
          }
        )
        .then((res) => {
          resolve(commit("deleteUser", deletedUser));
          loader.close();
          this._vm.$vs.notification({
            color: "success",
            position: "bottom-right",
            progress: "auto",
            title: "User data deleted successfully",
            text: "Yeay, your data is successfully deleted!",
          });
        })
        .catch((error) => {
          loader.close();
          reject(error);
        });
    });
  },
  deleteManyUsers({ commit }, deletedUsersId) {
    return new Promise((resolve, reject) => {
      const loader = this._vm.$vs.loading({
        background: "#ebf8ff",
        color: "#4299e1",
      });
      const deletedUsers = [];
      for (let key in deletedUsersId) {
        deletedUsers.push({ $oid: deletedUsersId[key] });
      }
      return axios
        .post(
          "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/deleteMany",
          {
            collection: "users",
            database: "synapsis",
            dataSource: "Cluster0",
            filter: { _id: { $in: deletedUsers } },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "Access-Control-Allow-Origin": "*",
              "api-key": process.env.VUE_APP_API_KEY,
            },
          }
        )
        .then((res) => {
          resolve(commit("deleteManyUsers", deletedUsersId));
          loader.close();
          this._vm.$vs.notification({
            color: "success",
            position: "bottom-right",
            progress: "auto",
            title: "Users data deleted successfully",
            text: "Yeay, your data is successfully deleted!",
          });
        })
        .catch((error) => {
          reject(error);
          loader.close();
        });
    });
  },
  // setUsers({ commit }, users) {
  //   commit("setUsers", users);
  // },
};

export const getters = {
  loadedUsers(state) {
    return state.loadedUsers;
  },
};
