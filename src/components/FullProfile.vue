<template>
  <v-container class="custom__user-profile" fluid>
    <v-layout column>
      <v-card v-if="!loading && user">
        <v-flex class="custom__user-avatar justify-center">
          <DSUserPicture :src="user.picture.large" />
        </v-flex>
        <v-card-text class="custom__user-content">
          <DSInput v-model="user.name.first" label="FirstName"></DSInput>
          <DSInput v-model="user.name.last" label="Last Name"></DSInput>
          <DSInput v-model="user.email" label="Email Address"></DSInput>
          <DSInput v-model="user.cell" label="Mobile"></DSInput>
          <DSInput v-model="user.phone" label="Phone"></DSInput>
        </v-card-text>
        <v-card-actions>
          <DSButton @click="change"> Change User </DSButton>

          <DSButton :loading="loading" @click.native="update">
            <v-icon left dark>mdi-check</v-icon>
            Save Changes
          </DSButton>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { emitter, EVENT_KEYS, userData } from "../dealful";
import { changeUser } from "../service/user.service";
import DSButton from "ds/DSButton";
import DSInput from "ds/DSInput";
import DSUserPicture from "ds/DSUserPicture";

export default {
  name: "FullProfile",
  components: {
    DSButton,
    DSInput,
    DSUserPicture,
  },
  data() {
    return {
      user: {},
      loading: true,
    };
  },
  mounted() {
    this.loadUser();
    console.log("profile", this.$store.getters["user/user"]);

    emitter.on(EVENT_KEYS.CHANGE_USER, (newUserData) => {
      this.user = newUserData();
    });
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
        this.user = userData();
      } catch (err) {
        console.warn(err);
      } finally {
        this.loading = false;
      }
    },
    async change() {
      try {
        await changeUser();
        this.user = userData();
      } catch (error) {
        console.error(error);
      }
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
