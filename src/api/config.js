import service from "@/utils/axios";

// 获取配置
export function getConfig() {
  return service({
    method: "GET",
    url: "/api/user/config",
  });
}

// 更新配置
export function setConfig(data) {
  return service({
    method: "POST",
    url: "/api/user/config",
    data,
  });
}
