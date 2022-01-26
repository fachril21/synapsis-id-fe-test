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
};

export const actions = {
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
  setUsers({ commit }, users) {
    commit("setUsers", users);
  },
};

export const getters = {
  loadedUsers(state) {
    return state.loadedUsers;
  },
};

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       loadedUsers: [],
//     },
//     mutations: {
//       setUsers(state, users) {
//         state.loadedUsers = users;
//       },
//     },
//     actions: {
//       nuxtServerInit(vuexContext, context) {
//         return axios
//           .post(
//             "https://data.mongodb-api.com/app/data-ersjc/endpoint/data/beta/action/find",
//             {
//               collection: "users",
//               database: "synapsis",
//               dataSource: "Cluster0",
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 "Access-Control-Request-Headers": "*",
//                 "api-key":
//                   "o9WxKT7XkkhQ0ImG1hjlJRlrRBwBOs4VnfnlAp60Z24goqV79K6RVQlzbMw2Yldx",
//               },
//             }
//           )
//           .then((res) => {
//             const usersArray = [];
//             for (const key in res.data.documents) {
//               usersArray.push(res.data.documents[key]);
//             }
//             vuexContext.commit("setUsers", usersArray);
//           })
//           .catch((e) => context.error(e));
//       },
//       setUsers(vuexContext, users) {
//         vuexContext.commit("setUsers", users);
//       },
//     },
//     getters: {
//       loadedUsers(state) {
//         return state.loadedUsers;
//       },
//     },
//   });
// };

// export default createStore;
