<template>
  <v-container class="custom__user-profile" fluid>
    <v-btn @click="change">change</v-btn>
    <v-layout column>
      <v-card v-if="!loading && user">
        <v-flex class="custom__user-avatar justify-center">
          <v-avatar size="124" class="mr-4 elevation-6">
            <img :src="user.picture.large" alt="Avatar" />
          </v-avatar>
        </v-flex>
        <v-card-text class="custom__user-content">
          <v-text-field
            v-model="user.name.first"
            label="FirstName"
          ></v-text-field>
          <v-text-field
            v-model="user.name.last"
            label="Last Name"
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email Address"
          ></v-text-field>
          <v-text-field v-model="user.cell" label="Mobile"></v-text-field>
          <v-text-field v-model="user.phone" label="Phone"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :loading="loading" @click.native="update">
            <v-icon left dark>mdi-check</v-icon>
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { fetchUser } from "@/service/user.service.js";
import emitters from "store/emitters";

export default {
  name: "FullProfile",
  data() {
    return {
      user: {},
      loading: true,
    };
  },
  mounted() {
    this.loadUser();
    console.log("profile", this.$store.getters["user/user"]);
  },
  created() {
    console.log(
      "created life cicly - userData - Profile: ",
      emitters.helpers.userData().name.first
    );
  },
  computed: {
    userPicture() {
      return !this.loading && this.user ? this.user.picture.large : "";
    },
    userName() {
      return !this.loading && this.user
        ? `${this.user.name.first} ${this.user.name.last}`
        : "";
    },
  },
  methods: {
    async loadUser() {
      try {
        const response = await fetchUser();
        this.user = response.results[0];
      } catch (err) {
        console.warn(err);
      } finally {
        this.loading = false;
      }
    },
    async change() {
      await emitters.services.setUser();
    },
  },
};
</script>
<style scoped>
.custom__user-profile {
  margin-top: 100px;
}
.custom__user-content {
  padding-top: 100px;
}
.custom__user-avatar {
  position: absolute;
  top: -50px;
  transform: translateX(-50%);
  left: 50%;
}
</style>
