<template>
    <el-card class="box-card">
        <form action=""></form>
        <div class="phone">
            <el-popover placement="right" width="600" trigger="click">
                <div class="bg-light">
                    <div class="card">
                        <div class="card-header">
                            图片广告
                        </div>
                        <div class="card-body bg-light">
                            <blockquote
                                class="blockquote mb-0"
                                style="font-size: 13px"
                            >
                                <el-row>
                                    <el-col :span="3">
                                        选择模板:
                                    </el-col>
                                    <el-col :span="21">
                                        <el-row :gutter="10">
                                            <el-col :span="8">
                                                <div
                                                    class="text-center border bg-white p-1"
                                                    :class="
                                                        bannerType == 1
                                                            ? 'border-primary'
                                                            : ''
                                                    "
                                                    style="height: 100px;"
                                                    @click="selectTemplate('1')"
                                                >
                                                    <div
                                                        class="bg-info h-75 mb-1"
                                                    ></div>
                                                    轮播海报
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div
                                                    class="text-center border bg-white p-1"
                                                    :class="
                                                        bannerType == 2
                                                            ? 'border-primary'
                                                            : ''
                                                    "
                                                    style="height: 100px;"
                                                    @click="selectTemplate('2')"
                                                >
                                                    <div
                                                        class="bg-info h-75 mb-1"
                                                    ></div>
                                                    视频
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <div v-if="bannerType == 1">
                                    <el-row>
                                        <el-col :span="3" class="mb-2 mt-2">
                                            选择模板:
                                        </el-col>
                                        <el-col :span="21"> </el-col>
                                    </el-row>
                                    <div v-if="imageUrl.length > 0">
                                        <el-card
                                            shadow="never"
                                            class="text-center mb-2 p-2"
                                            v-for="(item, index) in imageUrl"
                                            :key="index"
                                        >
                                            <el-row
                                                class="d-flex align-items-center"
                                            >
                                                <el-col
                                                    :span="6"
                                                    class="mb-2 mt-2"
                                                >
                                                    <div class="img-preview">
                                                        <img
                                                            :src="item"
                                                            class="avatar border"
                                                        />
                                                        <el-upload
                                                            action="https://jsonplaceholder.typicode.com/posts/"
                                                            :show-file-list="
                                                                false
                                                            "
                                                            :before-upload="
                                                                beforeAvatarUpload
                                                            "
                                                            class="replace-img"
                                                        >
                                                            更换图片
                                                        </el-upload>
                                                    </div>
                                                </el-col>
                                                <el-col :span="18">
                                                    跳转路径：
                                                    <el-select
                                                        v-model="value[index]"
                                                        placeholder="请选择"
                                                    >
                                                        <el-option
                                                            v-for="item in options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                        >
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </div>
                                    <el-upload
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                    >
                                        <el-card
                                            shadow="never"
                                            class="text-center"
                                            style="cursor: pointer"
                                        >
                                            <div class="text-primary">
                                                添加一张背景图
                                            </div>
                                            <div class="text-black-50">
                                                建议尺寸750*350像素
                                            </div>
                                        </el-card>
                                    </el-upload>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div class="block" slot="reference">
                    <el-carousel
                        trigger="click"
                        arrow="never"
                        height="150px"
                        v-if="imageUrl.length > 0"
                    >
                        <el-carousel-item v-for="item in imageUrl" :key="item">
                            <img :src="item" alt="" class="banner-img" />
                        </el-carousel-item>
                    </el-carousel>
                    <el-carousel
                        trigger="click"
                        arrow="never"
                        height="150px"
                        v-else
                    >
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small">{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-popover>
            <!-- 标题 -->
            <el-popover placement="right" width="600" trigger="click">
                <!-- 标题设置 -->
                <div class="bg-light">
                    <div class="card">
                        <div class="card-header">
                            标题
                        </div>
                        <div class="card-body bg-light">
                            <el-form ref="form" label-width="120px">
                                <el-form-item label="标题名" class="mb-0">
                                    <el-input
                                        size="small"
                                        v-model="titleTemplate.lordTitle"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="文本样式" class="mb-0">
                                    <el-radio-group
                                        @change="radioDame"
                                        v-model="titleTemplate.fontWeight"
                                    >
                                        <el-radio label="常规体"></el-radio>
                                        <el-radio label="加粗体"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="主标题字体色" class="mb-0">
                                    <el-color-picker
                                        v-model="titleTemplate.lordColor"
                                        show-alpha
                                        :predefine="predefineColors"
                                    >
                                    </el-color-picker>
                                </el-form-item>
                                <el-form-item label="显示位置" class="mb-0">
                                    <el-radio-group
                                        v-model="titleTemplate.location"
                                    >
                                        <el-radio label="居左显示"></el-radio>
                                        <el-radio label="居中显示"></el-radio>
                                        <el-radio label="居右显示"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="副标题" class="mb-0">
                                    <el-input
                                        size="small"
                                        v-model="titleTemplate.viceTitle"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="副标题字体色" class="mb-0">
                                    <el-color-picker
                                        v-model="titleTemplate.viceColor"
                                        show-alpha
                                        :predefine="predefineColors"
                                    >
                                    </el-color-picker>
                                </el-form-item>
                                <el-form-item label="背景色" class="mb-0">
                                    <el-color-picker
                                        v-model="titleTemplate.backgroundColor"
                                        show-alpha
                                        :predefine="predefineColors"
                                    >
                                    </el-color-picker>
                                </el-form-item>
                                <el-form-item label="外边距" class="mb-0">
                                    <el-slider
                                        v-model="titleTemplate.marginTop"
                                    ></el-slider>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <!-- 标题展示 -->
                <div
                    class="block headline"
                    slot="reference"
                    :class="
                        titleTemplate.location == '居左显示'
                            ? 'text-left'
                            : titleTemplate.location == '居中显示'
                            ? 'text-center'
                            : 'text-right'
                    "
                    :style="{
                        marginTop: titleTemplate.marginTop + 'px',
                        backgroundColor: titleTemplate.backgroundColor
                    }"
                >
                    <div
                        class="title-big"
                        :style="{
                            color: titleTemplate.lordColor,
                            fontWeight:
                                titleTemplate.fontWeight == '加粗体'
                                    ? 'blod'
                                    : 'normal'
                        }"
                    >
                        {{ titleTemplate.lordTitle }}
                    </div>
                    <div
                        class="title-small"
                        :style="'color:' + titleTemplate.viceColor"
                    >
                        {{ titleTemplate.viceTitle }}
                    </div>
                </div>
            </el-popover>
            <!-- 商品列表 -->
            <el-popover placement="right" width="600" trigger="click">
                <!-- 商品设置 -->
                <div class="bg-light">
                    <div class="card">
                        <div class="card-header">
                            商品
                        </div>
                        <div class="card-body bg-light">
                            <el-form ref="form" label-width="120px">
                                <el-form-item label="列表样式" class="mb-0">
                                    <el-radio-group
                                        v-model="shopTemplate.listStyle"
                                    >
                                        <el-radio label="大图模式"></el-radio>
                                        <el-radio label="一行两个"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="页面边距" class="mb-0">
                                    <el-slider
                                        v-model="shopTemplate.marginLeftRight"
                                        :max="30"
                                    ></el-slider>
                                </el-form-item>
                                <el-form-item label="上下边距" class="mb-0">
                                    <el-slider
                                        v-model="shopTemplate.marginTop"
                                        :max="30"
                                    ></el-slider>
                                </el-form-item>
                                <el-form-item label="列表样式" class="mb-0">
                                    <el-radio-group
                                        v-model="shopTemplate.imgScale"
                                    >
                                        <el-radio label="3_2">3:2</el-radio>
                                        <el-radio label="default">1:1</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <!-- 商品展示 -->
                <div class="block" slot="reference">
                    <!-- 大图模式 -->
                    <div
                        :style="{
                            margin: '0px ' + shopTemplate.marginLeftRight + 'px'
                        }"
                        class="commodity-list-style1" v-if="shopTemplate.listStyle == '大图模式'"
                    >
                        <div
                            class="commodity-item"
                            v-for="i in 2"
                            :key="i"
                            :style="{
                                marginTop: shopTemplate.marginTop + 'px'
                            }"
                        >
                            <div
                                class="img-1_1"
                                v-if="shopTemplate.imgScale == 'default'"
                            >
                                <img
                                    src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2%2F2%2Fw%2F520%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp"
                                    mode=""
                                />
                            </div>
                            <div
                                class="img-3_2"
                                v-else-if="shopTemplate.imgScale == '3_2'"
                            >
                                <img
                                    src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2%2F2%2Fw%2F520%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp"
                                    mode=""
                                />
                            </div>
                            <div class="commodity-title">
                                这里显示商品名称，最多显示两行
                            </div>
                            <div class="commodity-foot">
                                <div>
                                    <span
                                        class="text-danger mr-1"
                                        style="font-size: 16px"
                                        >¥99</span
                                    >
                                    <s
                                        class="text-black-50 text-sm"
                                        style="font-size: 12px"
                                        >¥99</s
                                    >
                                </div>
                                <el-button type="danger" size="mini"
                                    >详情</el-button
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        :style="{
                            margin: '0px ' + shopTemplate.marginLeftRight + 'px'
                        }"
                        class="commodity-list-style2" v-else-if="shopTemplate.listStyle == '一行两个'"
                    >
                        <div
                            class="commodity-item"
                            v-for="i in 4"
                            :key="i"
                            :style="{
                                marginTop: shopTemplate.marginTop + 'px'
                            }"
                        >
                            <div
                                class="img-1_1"
                                v-if="shopTemplate.imgScale == 'default'"
                            >
                                <img
                                    src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2%2F2%2Fw%2F520%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp"
                                    mode=""
                                />
                            </div>
                            <div
                                class="img-3_2"
                                v-else-if="shopTemplate.imgScale == '3_2'"
                            >
                                <img
                                    src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2%2F2%2Fw%2F520%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp"
                                    mode=""
                                />
                            </div>
                            <div class="commodity-title">
                                这里显示商品名称，最多显示两行
                            </div>
                            <div class="commodity-foot">
                                <div>
                                    <div class="price-content">
                                        <s
                                            class="text-black-50 text-sm"
                                            style="font-size: 12px"
                                            >¥99</s
                                        >
                                    </div>
                                    <span
                                        class="text-danger mr-1"
                                        style="font-size: 16px"
                                        >¥99</span
                                    >
                                </div>
                                <el-button type="danger" size="mini"
                                    >详情</el-button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </el-popover>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            bannerType: "1",
            imageUrl: [],
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                }
            ],
            value: [],
            index: 1,
            predefineColors: [
                "#ffffff",
                "#F8F8F8",
                "#F2F2F2",
                "#999999",
                "#444444",
                "#FF4444",
                "#FF6500",
                "#FF884D",
                "rgb(255, 120, 0)",
                "hsv(51, 100, 98)",
                "hsva(120, 40, 94, 0.5)",
                "hsl(181, 100%, 37%)",
                "hsla(209, 100%, 56%, 0.73)"
            ],
            titleTemplate: {
                color: "#F8F8F8",
                lordTitle: "主标题",
                lordColor: "#333333",
                viceTitle: "副标题",
                viceColor: "#999999",
                location: "居中显示",
                marginTop: 10,
                fontWeight: "加粗体"
            },
            shopTemplate: {
                marginLeftRight: 0,
                marginTop: 10,
                imgScale: "default",
                listStyle: "一行两个"
            }
        };
    },
    methods: {
        // 广告图片选择模板类型
        selectTemplate(tag) {
            this.bannerType = tag;
        },
        // 图片上传
        handleAvatarSuccess(res, file) {
            this.imageUrl.push(URL.createObjectURL(file.raw));
            console.log(this.imageUrl);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        radioDame(e) {
            console.log(e, this.titleTemplate.fontWeight);
        }
    }
};
</script>

<style>
.el-upload {
    display: block;
}
.p-2 .el-card__body {
    padding: 0;
}
.replace-img .el-upload {
    background: transparent;
    color: #fff;
    font-size: 12px;
    border: none;
}
</style>

<style scoped>
.phone {
    width: 375px;
    border: 1px solid #ccc;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
/* 图片上传 */
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}

.img-preview {
    position: relative;
}

.replace-img {
    position: absolute;
    bottom: 0;
    width: 100px;
    left: 0;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    padding: 5px 0;
}
.banner-img {
    width: 100%;
    height: 100%;
}
.headline {
    padding: 10px 0;
    text-align: center;
}

.headline .title-big {
    font-size: 16px;
    color: #333;
    font-weight: bold;
}

.headline .title-small {
    font-size: 13px;
    color: #999;
}
/* 商品样式一行一个 */
.commodity-list-style1 {
    margin: 0 10px;
}

.commodity-item:first-child {
    margin-top: 0;
}

.commodity-item {
    margin-top: 10px;
    border: 1px solid #e9e9e9;
    background: #fff;
}

.commodity-item img {
    width: 100%;
}

.commodity-title {
    overflow: hidden;
    height: 44px;
    line-height: 21px;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 5px 5px 0;
}

.commodity-item image {
    width: 100%;
}

.price-content {
    height: 18px;
}

.commodity-foot {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    padding: 0 5px 5px;
    align-items: center;
}

.commodity-foot image {
    width: 20px;
    height: 20px;
    align-items: center;
}
/* 商品样式 一行两个 */
.commodity-list-style2 {
    display: flex;
    padding-left: 10px;
    flex-wrap: wrap;
    align-content: flex-start;
}

.commodity-list-style2 .commodity-item:first-child,
.commodity-list-style2 .commodity-item:nth-child(2) {
    margin-top: 0;
}

.commodity-list-style2 .commodity-item {
    display: flex;
    flex-direction: column;
    width: calc(50% - 10px);
    margin: 10px 10px 0 0;
}

/* 商品图片比例 */
.img-1_1 {
    height: 0;
    padding-top: 100%;
    position: relative;
    overflow: hidden;
}

.img-1_1 img {
    height: 100% !important;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.img-3_2 {
    height: 0;
    padding-top: 70%;
    position: relative;
    overflow: hidden;
}

.img-3_2 img {
    height: 100% !important;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>
