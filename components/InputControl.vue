<template>
  <div class="flex flex-col gap-2 w-full">
    <label class="text-sm text-gray-500"><slot /></label>
    <input
      class="bg-gray-200 p-2 rounded-xl px-4"
      type="text"
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :value="value"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <input
      class="bg-gray-200 p-2 rounded-xl px-4"
      type="email"
      v-if="controlType === 'email'"
      v-bind="$attrs"
      :value="value"
      :required="required"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <input
      class="bg-gray-200 p-2 rounded-xl px-4"
      type="number"
      v-if="controlType === 'phone'"
      v-bind="$attrs"
      :value="value"
      :required="required"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      class="bg-gray-200 p-2 rounded-xl px-4"
      v-if="controlType === 'textarea'"
      rows="3"
      :value="value"
      :required="required"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <label class="text-sm text-red-500 font-bold" v-if="this.msg.length > 0">
      <div v-for="item in msg" :key="item">
        {{ item }}
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "InputControl",
  props: {
    controlType: {
      type: String,
      default: "input",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      msg: [],
      inputType: this.controlType,
    };
  },
  watch: {
    value(value) {
      if (this.controlType == "email") {
        if (!this.validEmail(value)) {
          if (!this.msg.includes("Valid email required.")) {
            this.msg.push("Valid email required.");
          }
        } else {
          this.msg = [];
        }
      }
    },
  },
  methods: {
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
