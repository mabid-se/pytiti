export default {
  methods: {
    isNumber(evt) {
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "-",
      ];
      const keyPressed = evt.key;

      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },
    updateChange(e) {
      let value;
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }

      this.$emit("update:modelValue", {
        ...this.modelValue,
        [e.target.name]: value,
      });
    },
  },
};
