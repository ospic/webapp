import swal from "sweetalert";
export default {
  data() {
    return {};
  },
  computed: {
    isMdAndUp() {
      return $vuetify.breakpoint.mdAndUp;
    }

  },
  methods: {
    async delete_selected_item(dipatch, item) {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this data?",
        icon: "warning",
        dangerMode: true,
      });

      if (willDelete) {
        this.$store.dispatch(dipatch, item);
        swal("Deleted!", "Your imaginary file has been deleted!", "success");
      }
    },
  },
};
