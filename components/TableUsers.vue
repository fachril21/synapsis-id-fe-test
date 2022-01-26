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
              <vs-button icon flat>
                <i class="bx bx-edit"></i>
              </vs-button>
              <vs-button icon flat color="danger">
                <i class="bx bx-trash-alt"></i>
              </vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination
          only-arrows
          v-model="page"
          :length="$vs.getLength(dataUsers, max)"
        />
      </template>
    </vs-table>
  </div>
</template>
<script>
export default {
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
    };
  },
};
</script>
