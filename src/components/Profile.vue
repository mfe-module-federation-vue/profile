<template>
  <v-card v-if="!loading && user" height="150">
    <v-row class="pt-2 pl-2">
      <v-col class="align-content-center" align-self="center" cols="4">
        <DSUserPicture :src="userPicture" />
      </v-col>
      <v-col align-self="start" cols="8">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ userName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.cell }} - {{ user.phone }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="user.location">
              {{ user.location.street.number }},
              {{ user.location.street.name }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="user.location">
              {{ user.location.city }} -
              {{ user.location.state }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { emitter, EVENT_KEYS } from "../dealful";
import { userData } from "../service/storage";
import DSUserPicture from "ds/DSUserPicture";

export default {
  name: "Profile",
  components: { DSUserPicture },
  data: () => ({
    user: {},
    loading: true,
  }),
  mounted() {
    this.loadUser();
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
  },
};
</script>

<style scoped>
.align-content-center {
  margin: auto;
  text-align: center;
}
</style>
