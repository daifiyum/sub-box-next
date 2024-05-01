import service from "@/utils/axios";

// 用户登录
export function userlogin(data) {
  return service({
    method: "POST",
    url: "/api/user/login",
    data,
  });
}

// 是否初始化
export function isSetup() {
  return service({
    method: "GET",
    url: "/api/user/setup",
  });
}

// 初始化用户
export function setupUser(data) {
  return service({
    method: "POST",
    url: "/api/user/setup",
    data,
  });
}
