<template>
  <contacts-form :title="title"></contacts-form>
</template>
<script>
import _contacts_form from "~/components/contact_form";
export default {
  components: {
    "contacts-form": _contacts_form
  },
  data: () => ({
    title: "Add contact"
  })
};
</script>
