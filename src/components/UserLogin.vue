<template>
  <v-card class="mx-auto mt-3" elevation="2" max-width="390" rounded="lg">
    <v-card-item>
      <v-card-title>{{ switchText }}</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model="username"
          :rules="inputRules"
          placeholder="用户"
          prepend-inner-icon="mdi-account-circle-outline"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="inputRules"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="密码"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn color="primary" :disabled="!valid" block rounded @click="submit">
          {{ switchText }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, reactive, computed, onBeforeMount } from "vue";
import { userlogin, isSetup, setupUser } from "@/api/login";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";
import emitter from "@/utils/emitter";

const router = useRouter();

let valid = ref(true);
let visible = ref(false);
let isRegistered = ref(true);
let username = ref("");
let password = ref("");
let inputRules = reactive([(value) => !!value]);
let loginStore = useLoginStore();

onBeforeMount(async () => {
  let res = await isSetup();
  isRegistered.value = res.isInitialized;
});

let switchText = computed(() => {
  if (isRegistered.value) {
    return "登录";
  } else {
    return "注册";
  }
});

async function submit() {
  if (isRegistered.value) {
    let res = await userlogin({
      username: username.value,
      password: password.value,
    });
    loginStore.setToken(res.token);
    router.push({ name: "home" });
    emitter.emit("getConfig");
  } else {
    await setupUser({
      username: username.value,
      password: password.value,
    });
    isRegistered.value = true;
  }
}
</script>

<style lang="css" scoped></style>
