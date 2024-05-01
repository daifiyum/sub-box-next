<template>
  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <v-toolbar>
      <v-toolbar-title>设置</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-close" @click="drawer = !drawer"></v-btn>
    </v-toolbar>
    <v-container>
      <v-select
        label="更新延时"
        v-model="updateDelay"
        :items="items"
        @update:model-value="setUpdateDelay"
      >
      </v-select>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getConfig, setConfig } from "@/api/config";
import { storeToRefs } from "pinia";
import { useDrawerStore } from "@/stores/drawer";
const drawerStore = useDrawerStore();
const { drawer } = storeToRefs(drawerStore);

// 设置抽屉
const items = ref(["15m", "30m", "1h", "1d"]);
const updateDelay = ref("");
onMounted(async () => {
  const { config } = await getConfig();
  updateDelay.value = config.update_delay;
});
async function setUpdateDelay() {
  await setConfig({ update_delay: updateDelay.value });
}
</script>

<style lang="scss" scoped></style>
