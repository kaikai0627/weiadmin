export default {
    // 过滤器
    filters: {
        // 将数字转为字符串
        numToString(value) {
            return value.toString();
        }
    },
    // 计算table最大高度
    tabHeight(topH, contentH) {
        // 获取搜索与按钮的不确定高度
        let height = topH.offsetHeight;
        // 获取内页容器高度
        let contentHeight = contentH.offsetHeight;
        return contentHeight - height - 10
    }
}