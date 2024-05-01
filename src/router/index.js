import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useLoginStore } from "@/stores/login";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuth) {
    const loginStore = useLoginStore();
    if (!loginStore.token) {
      next("admin");
      return;
    }
  }
  next();
});

export default router;
