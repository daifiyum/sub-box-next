<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <v-toolbar dark prominent>
        <v-toolbar-title>设置</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          icon="mdi-close"
          @click="drawer = !drawer"
          v-if="loginStore.token"
        >
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-select
          label="更新延时"
          v-model="updateDelay"
          :items="items"
          @update:model-value="setUpdateDelay"
        ></v-select>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar>
      <template v-slot:prepend>
        <v-img
          src="@/assets/logo.svg"
          width="35"
          transition="scale-transition"
        ></v-img>
      </template>
      <v-app-bar-title>sub-box</v-app-bar-title>
      <template v-slot:append>
        <v-btn
          variant="outlined"
          rounded
          color="primary"
          prepend-icon="mdi-vpn"
          class="mr-2"
          link
          :href="toProxyManager"
        >
          代理面板
        </v-btn>
        <v-btn
          icon="mdi-cog-outline"
          @click="drawer = !drawer"
          v-if="loginStore.token"
        ></v-btn>
        <v-btn
          icon="mdi-logout"
          @click="signOut"
          v-if="loginStore.token"
        ></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RouterView } from "vue-router";
import { useLoginStore } from "./stores/login";
import { getConfig, setConfig } from "@/api/config";
import emitter from "./utils/emitter";

// 设置抽屉
const drawer = ref(false);
const items = ref(["15m", "30m", "1h", "1d"]);
const updateDelay = ref("");

emitter.on("getConfig", async () => {
  const config = await getConfig();
  updateDelay.value = config.config.update_delay;
});

async function setUpdateDelay() {
  await setConfig({ update_delay: updateDelay.value });
}

// 代理面板地址
let toProxyManager = ref(`http://${window.location.hostname}:9099/ui/`);

// 退出登录
const router = useRouter();
const loginStore = useLoginStore();
function signOut() {
  loginStore.removeToken();
  router.push({ name: "admin" });
}
</script>

<style scoped></style>
