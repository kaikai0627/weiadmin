<template>
    <draggable
        :list="items"
        :options="{ group: 'title', animation: 150 }"
        :no-transition-on-drag="true"
        @change="change"
        @start="start"
        @end="end"
        :move="move"
    >
        <transition-group
            type="transition"
            
            :css="true"
        >
            <div class="item" v-for="item in items" :key="item.key">
                <el-popover
                    placement="right"
                    width="400"
                    trigger="click"
                    v-if="item.key == 1"
                >
                    <div>弹框</div>
                    <div slot="reference">click 激活</div>
                </el-popover>
                <el-popover
                    placement="right"
                    width="400"
                    trigger="click"
                    v-if="item.key == 2"
                >
                    <div>弹框</div>
                    <div slot="reference">
                        <span>你看看</span>
                        <span>你看看</span>
                        <span>你看看</span>
                        <span>你看看</span>
                    </div>
                </el-popover>
                <el-popover
                    placement="right"
                    width="400"
                    trigger="click"
                    v-if="item.key == 3"
                >
                    <div>弹框</div>
                    <div slot="reference">click 激活222</div>
                </el-popover>
            </div>
        </transition-group>
    </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
    name: "Toolbar",
    data() {
        return {
            items: [
                { key: 1, color: "#ffebcc" },
                { key: 2, color: "#ffb86c" },
                { key: 3, color: "#f01b2d" }
            ],

            dragging: null
        };
    },
    components: {
        draggable
    },
    methods: {
        //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
        change(evt) {
            console.log(evt, "change...");
        },
        //start ,end ,add,update, sort, remove 得到的都差不多
        start(evt) {
            this.drag = true;
            console.log(evt, "start...");
        },
        end(evt) {
            console.log(evt, "end....");
            this.drag = true;
            evt.item; //可以知道拖动的本身
            evt.to; // 可以知道拖动的目标列表
            evt.from; // 可以知道之前的列表
            evt.oldIndex; // 可以知道拖动前的位置
            evt.newIndex; // 可以知道拖动后的位置
        },
        move(evt, originalEvent) {
            console.log(evt, "move");
            console.log(originalEvent); //鼠标位置
        }
    }
};
</script>
  
<style scoped>
.container {
    width: 80px;
    height: 300px;
    /* position: absolute; */
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 0;
}
.item {
    /* margin-top: 10px; */
    transition: all linear 0.3s;
}
</style>