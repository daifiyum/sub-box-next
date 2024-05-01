import service from "@/utils/axios";

// 获取订阅
export function get_sub() {
  return service({
    method: "GET",
    url: "/api/subscribe/list",
  });
}

// 添加订阅
export function add_sub(data) {
  return service({
    method: "POST",
    url: "/api/subscribe/new",
    data,
  });
}

// 删除订阅
export function rm_sub(id) {
  return service({
    method: "DELETE",
    url: `/api/subscribe/remove/${id}`,
  });
}

// 修改订阅
export function rw_sub(id, data) {
  return service({
    method: "PUT",
    url: `/api/subscribe/edit/${id}`,
    data,
  });
}

// 更新订阅
export function up_sub(id) {
  return service({
    method: "PUT",
    url: `/api/subscribe/update/${id}`,
  });
}

// 切换订阅
export function sw_sub(id) {
  return service({
    method: "PUT",
    url: `/api/subscribe/switch/${id}`,
  });
}
