<template>
  <div>
    <component
      :is="componentId"
      @handleClose="onClose"
      @deleteData="onDeleteConfirm"
      :user="deletedUserSelect"
    ></component>
    <div class="hidden sm:flex flex-col">
      <div class="flex justify-end">
        <vs-button
          flat
          v-if="selectedUsers.length != 0"
          color="danger"
          @click="showDeleteDialog(selectedUsers)"
        >
          Delete Selected Users
        </vs-button>
      </div>
      <vs-table v-model="selectedUsers">
        <template #thead>
          <vs-tr>
            <vs-th>
              <vs-checkbox
                :indeterminate="selectedUsers.length == dataUsers.length"
                v-model="allCheck"
                @change="selectedUsers = $vs.checkAll(selectedUsers, dataUsers)"
              />
            </vs-th>
            <vs-th
              sort
              @click="dataUsers = $vs.sortData($event, dataUsers, 'first_name')"
            >
              Name
            </vs-th>
            <vs-th
              sort
              @click="dataUsers = $vs.sortData($event, dataUsers, 'email')"
            >
              Email
            </vs-th>
            <vs-th
              sort
              @click="dataUsers = $vs.sortData($event, dataUsers, 'phone')"
            >
              Phone
            </vs-th>
            <vs-th
              sort
              @click="dataUsers = $vs.sortData($event, dataUsers, 'address')"
            >
              Address
            </vs-th>
            <vs-th> Action </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage(dataUsers, page, max)"
            :data="tr"
            :is-selected="!!selectedUsers.includes(tr._id)"
          >
            <vs-td checkbox>
              <vs-checkbox
                :val="tr._id"
                v-model="selectedUsers"
                color="#4299e1"
              />
            </vs-td>
            <vs-td> {{ tr.first_name }} {{ tr.last_name }} </vs-td>
            <vs-td>
              {{ tr.email }}
            </vs-td>
            <vs-td>
              {{ tr.phone }}
            </vs-td>
            <vs-td>
              {{ tr.address }}
            </vs-td>
            <vs-td>
              <div class="flex flex-row">
                <vs-button icon flat @click="onEdit(tr._id)">
                  <i class="bx bx-edit"></i>
                </vs-button>
                <vs-button
                  icon
                  flat
                  color="danger"
                  @click="showDeleteDialog(tr)"
                >
                  <i class="bx bx-trash-alt"></i>
                </vs-button>
              </div>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <div class="flex flex-row gap-4 items-center justify-center">
            <vs-button
              class="focus:outline-none"
              relief
              color="#4299e1"
              :active="false"
              icon
              @click="onPrev"
            >
              <i class="bx bx-chevron-left"></i>
            </vs-button>
            <div
              class="px-2 py-1 bg-blue-200 rounded-md font-bold text-blue-800 flex items-center"
            >
              Page: {{ page }} of {{ getLengthPage }} pages -
              {{ dataUsers.length }} users
            </div>
            <vs-select v-model="max">
              <vs-option label="5 users / page" :value="5">
                5 users / page
              </vs-option>
              <vs-option label="10 users / page" :value="10">
                10 users / page
              </vs-option>
              <vs-option label="15 users / page" :value="15">
                15 users / page
              </vs-option>
              <vs-option label="20 users / page" :value="20">
                20 users / page
              </vs-option>
            </vs-select>
            <vs-button
              class="focus:outline-none"
              relief
              color="#4299e1"
              :active="false"
              icon
              @click="onNext"
            >
              <i class="bx bx-chevron-right"></i>
            </vs-button>
          </div>
        </template>
        <template #notFound>
          <div v-if="dataUsers.length == 0">
            User data is still empty, you can add user data
            <nuxt-link
              to="/add-user"
              class="font-bold text-blue-500 hover:text-blue-600 cursor-pointer transition-all ease-in-out duration-300"
            >
              here
            </nuxt-link>
          </div>
        </template>
      </vs-table>
    </div>
    <div class="sm:hidden flex flex-col gap-4 pb-16">
      <div
        class="delete-multiple-container fixed bottom-0 left-0 w-full p-4 bg-white z-50 flex flex-row justify-between"
        v-if="selectedUsers.length != 0"
      >
        <vs-button flat color="#4299e1" @click="selectedUsers = []">
          Unselect All
        </vs-button>
        <vs-button flat color="danger" @click="showDeleteDialog(selectedUsers)">
          Delete Selected Users
        </vs-button>
      </div>
      <div class="pagination-card flex flex-row justify-between">
        <vs-button
          class="focus:outline-none"
          relief
          color="#4299e1"
          :active="false"
          icon
          @click="onPrev"
        >
          <i class="bx bx-chevron-left"></i>
        </vs-button>
        <div class="flex flex-col gap-2 items-center justify-center">
          <div
            class="px-2 py-1 bg-blue-200 rounded-md font-bold text-blue-800 flex items-center"
          >
            Page: {{ page }} of {{ getLengthPage }} pages -
            {{ dataUsers.length }} users
          </div>
          <div class="w-full flex justify-center">
            <vs-select v-model="max">
              <vs-option label="5 users / page" :value="5">
                5 users / page
              </vs-option>
              <vs-option label="10 users / page" :value="10">
                10 users / page
              </vs-option>
              <vs-option label="15 users / page" :value="15">
                15 users / page
              </vs-option>
              <vs-option label="20 users / page" :value="20">
                20 users / page
              </vs-option>
            </vs-select>
          </div>
        </div>

        <vs-button
          class="focus:outline-none"
          relief
          color="#4299e1"
          :active="false"
          icon
          @click="onNext"
        >
          <i class="bx bx-chevron-right"></i>
        </vs-button>
      </div>
      <div class="flex flex-col gap-8">
        <div
          v-for="user in getPage(dataUsers, page, max)"
          :key="user._id"
          class="w-full rounded-xl bg-blue-200 shadow-xl flex flex-col p-4 gap-4"
        >
          <div class="flex flex-row items-center justify-between">
            <div class="name-info flex flex-row gap-4 items-center">
              <vs-checkbox
                :val="user._id"
                v-model="selectedUsers"
                color="#4299e1"
              />
              <vs-avatar color="#4299e1">
                <template #text> {{ getInitial(user) }} </template>
              </vs-avatar>
              <div class="name">
                <span class="font-bold text-xl">{{ getFullName(user) }}</span>
              </div>
            </div>
            <div class="action flex flex-row gap-1">
              <vs-button icon flat @click="onEdit(user._id)">
                <i class="bx bx-edit"></i>
              </vs-button>
              <vs-button
                icon
                flat
                color="danger"
                @click="showDeleteDialog(user)"
              >
                <i class="bx bx-trash-alt"></i>
              </vs-button>
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <span>Email :</span>
            <span class="font-bold">{{ user.email }}</span>
          </div>
          <div class="flex flex-row justify-between">
            <span>Phone :</span>
            <span class="font-bold">{{ user.phone }}</span>
          </div>
          <div class="flex flex-row justify-between">
            <span>Address :</span>
            <span class="font-bold">{{ user.address }}</span>
          </div>
        </div>
      </div>
      <div class="pagination-card flex flex-row justify-between">
        <vs-button
          class="focus:outline-none"
          relief
          color="#4299e1"
          :active="false"
          icon
          @click="onPrev"
        >
          <i class="bx bx-chevron-left"></i>
        </vs-button>
        <div class="flex flex-col gap-2 items-center justify-center">
          <div
            class="px-2 py-1 bg-blue-200 rounded-md font-bold text-blue-800 flex items-center"
          >
            Page: {{ page }} of {{ getLengthPage }} pages -
            {{ dataUsers.length }} users
          </div>
          <div class="w-full flex justify-center">
            <vs-select v-model="max">
              <vs-option label="5 users / page" :value="5">
                5 users / page
              </vs-option>
              <vs-option label="10 users / page" :value="10">
                10 users / page
              </vs-option>
              <vs-option label="15 users / page" :value="15">
                15 users / page
              </vs-option>
              <vs-option label="20 users / page" :value="20">
                20 users / page
              </vs-option>
            </vs-select>
          </div>
        </div>

        <vs-button
          class="focus:outline-none"
          relief
          color="#4299e1"
          :active="false"
          icon
          @click="onNext"
        >
          <i class="bx bx-chevron-right"></i>
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteDialogConfirmation from "@/components/DeleteDialogConfirmation.vue";
export default {
  components: {
    DeleteDialogConfirmation: DeleteDialogConfirmation,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dataUsers: this.data,
      search: "",
      page: 1,
      max: 5,
      componentId: "",
      deletedUserSelect: null,
      selectedUsers: [],
      allCheck: false,
    };
  },
  watch: {},
  methods: {
    onEdit(id) {
      this.$router.push("/edit-user/" + id);
    },
    onDelete(userData) {
      this.$store.dispatch("deleteUser", userData).catch((error) => {
        this.$nuxt.error(error);
      });
    },
    showDeleteDialog(userData) {
      this.deletedUserSelect = userData;
      this.componentId = "DeleteDialogConfirmation";
    },
    onClose(value) {
      this.componentId = value;
    },
    onDeleteConfirm(value) {
      if (Array.isArray(value)) {
        this.onDeleteManyUsers(value);
      } else {
        this.onDelete(value);
      }
    },
    onNext() {
      if (this.page != this.getLengthPage) {
        this.page = this.page + 1;
      }
    },
    onPrev() {
      if (this.page != 1) {
        this.page = this.page - 1;
      }
    },
    onDeleteManyUsers(usersData) {
      this.$store
        .dispatch("deleteManyUsers", usersData)
        .then(() => {
          this.isMany = false;
          this.selectedUsers = [];
        })
        .catch((error) => {
          this.$nuxt.error(error);
        });
    },
    getFullName(user) {
      return user.first_name + " " + user.last_name;
    },
    getInitial(user) {
      return (
        user.first_name.charAt(0).toUpperCase() +
        user.last_name.charAt(0).toUpperCase()
      );
    },
    getPage(dataUsers, page, max) {
      console.log("run");
      if (page == 1) {
        let data = [];
        for (let i = 0; i < max; i++) {
          if (!dataUsers[i]) break;
          data.push(dataUsers[i]);
        }
        if (data.length == 0) {
          this.page = page - 1;
          this.getPage(dataUsers, this.page, max);
        } else {
          return data;
        }
      } else {
        let data = [];
        let startIndex = max * (page - 1);
        for (let i = startIndex; i < startIndex + max; i++) {
          if (!dataUsers[i]) break;
          data.push(dataUsers[i]);
        }
        if (data.length == 0) {
          this.page = page - 1;
          this.getPage(dataUsers, this.page, max);
        } else {
          return data;
        }
      }
    },
  },
  computed: {
    getLengthPage() {
      return Math.ceil(this.dataUsers.length / this.max);
    },
  },
};
</script>
