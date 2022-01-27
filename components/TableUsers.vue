<template>
  <div>
    <vs-table>
      <template #header>
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
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
        >
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
              <vs-button icon flat color="danger" @click="showDeleteDialog(tr)">
                <i class="bx bx-trash-alt"></i>
              </vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <div class="flex flex-row gap-2 items-center justify-center">
          <vs-pagination
            only-arrows
            color="#4299e1"
            v-model="page"
            :length="getLengthPage"
          />
          <span
            class="px-2 py-1 bg-blue-200 rounded-md font-bold text-blue-800"
          >
            Page: {{ page }}
          </span>
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
    <component
      :is="componentId"
      @handleClose="onClose"
      @deleteData="onDeleteConfirm"
      :user="deletedUserSelect"
    ></component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
      max: 3,
      dialogActive: false,
      componentId: "",
      deletedUserSelect: {},
    };
  },
  methods: {
    onEdit(id) {
      this.$router.push("/edit-user/" + id);
    },
    onDelete(userData) {
      this.$store.dispatch("deleteUser", userData).then(() => {});
    },
    showDeleteDialog(userData) {
      this.deletedUserSelect = userData;
      this.componentId = "DeleteDialogConfirmation";
    },
    onClose(value) {
      this.componentId = value;
    },
    onDeleteConfirm(value) {
      console.log("on delete user " + value.first_name);
      this.onDelete(value);
    },
  },
  computed: {
    getLengthPage() {
      return Math.ceil(this.dataUsers.length / this.max);
    },
  },
};
</script>
