<template>
  <div>
    <v-list-item three-line>
      <v-list-item-content class="ma-0 ">
        <v-list-item-title class="font-weight-bold">
          <span class="text-subtitle-2 font-weight-bold">{{
            address.state
          }}</span
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <v-btn
            small
            depressed
            class="mb-1 primary--text"
            color="primary lighten-4"
            >{{ address.zipcode }}</v-btn
          >
        </v-list-item-title>
        <v-list-item-subtitle class="font-weight-light text-caption">
          {{ address.city }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-light text-caption">
          {{ address.physical_address }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>Contact Details</v-list-item-title>
        <v-list-item-subtitle class="font-weight-light text-caption">
          <strong>Mobile Phone: </strong> &nbsp;&nbsp;{{ address.work_phone
          }}<br />
          <strong> Home Phone:</strong> &nbsp;&nbsp;{{ address.home_phone }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-light text-caption">
          <strong>Email Address: </strong>&nbsp;&nbsp;{{
            address.email_address
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script lang="js">
export default {
  props:["address"],
  data(){
    return{

    }
  },
  created(){
    console.log(this.address);
  }
}
</script>
