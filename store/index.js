import axios from "axios";

export const state = () => ({
  loadedUsers: [],
});

export const mutations = {
  setUsers(state, users) {
    state.loadedUsers = users;
  },
  addUser(state, user) {
    state.loadedUsers.push(user);
  },
  editUser(state, editedUser) {
    const userIndex = state.loadedUsers.findIndex(
      (user) => user._id === editedUser._id
    );
    state.loadedUsers[userIndex] = editedUser;
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
    return axios
      .post(
        "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/insertOne",
        {
          collection: "users",
          database: "synapsis",
          dataSource: "Cluster0",
          document: { ...user },
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
        commit("addUser", user);
      })
      .catch((e) => console.log(e));
  },

  //Method for editing user.
  editUser({ commit }, editedUser) {
    return axios
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
            },
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
        commit("editUser", editedUser);
      })
      .catch((e) => console.log(e));
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
