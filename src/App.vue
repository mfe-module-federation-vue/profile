<template>
  <v-app>
    <Profile />
    <FullProfile />
  </v-app>
</template>

<script>
import Profile from "./components/Profile";
import FullProfile from "./components/FullProfile";

export default {
  name: "App",

  components: {
    Profile,
    FullProfile,
  },

  data: () => ({
    //
  }),
};
</script>
