<template>
    <el-card class="box-card" style="margin-bottom: 60px">
        <div
            class="phone"
            :style="{ backgroundColor: pageTemplate.backgroundColor }"
        >
            <!-- 头部 -->
            <el-popover placement="right" width="600" trigger="click">
                <!-- 头部设置 -->
                <div class="bg-light">
                    <div class="card">
                        <div class="card-header">
                            页面设置
                        </div>
                        <div class="card-body bg-light">
                            <el-form ref="form" label-width="120px">
                                <el-form-item label="页面名称" class="mb-0">
                                    <el-input
                                        size="small"
                                        v-model="pageTemplate.title"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="页面描述" class="mb-0">
                                    <el-input
                                        size="small"
                                        v-model="pageTemplate.describe"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="生效日期" class="mb-0">
                                    <el-date-picker
                                        v-model="pageTemplate.datetime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="是否为主页" class="mb-0">
                                    <el-switch v-model="pageTemplate.isMain">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="是否有效" class="mb-0">
                                    <el-switch v-model="pageTemplate.isResult">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="背景颜色" class="mb-0">
                                    <el-color-picker
                                        v-model="pageTemplate.backgroundColor"
                                        show-alpha
                                        :predefine="predefineColors"
                                    >
                                    </el-color-picker>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <!-- 头部展示 -->
                <div class="block page" slot="reference">
                    <div class="page-title">{{ pageTemplate.title }}</div>
                    <img
                        src="../../../../assets/images/wx-hd.png"
                        alt=""
                        width="373"
                    />
                </div>
            </el-popover>
            <draggable
                v-if="moduleList.length > 0"
                :list="moduleList"
                :options="{ animation: 150 }"
                :no-transition-on-drag="true"
                @change="change"
                @start="start"
                @end="end"
                :move="move"
            >
                <transition-group type="transition" :css="true">
                    <div v-for="(item, index) in moduleList" :key="index">
                        <!-- 图片广告 -->
                        <el-popover
                            placement="right"
                            width="600"
                            trigger="click"
                            v-if="item.controlName == 'ImageAd'"
                        >
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
                                                                    item.bannerType ==
                                                                    1
                                                                        ? 'border-primary'
                                                                        : ''
                                                                "
                                                                style="height: 100px;"
                                                                @click="
                                                                    selectTemplate(
                                                                        index,
                                                                        '1'
                                                                    )
                                                                "
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
                                                                    item.bannerType ==
                                                                    2
                                                                        ? 'border-primary'
                                                                        : ''
                                                                "
                                                                style="height: 100px;"
                                                                @click="
                                                                    selectTemplate(
                                                                        index,
                                                                        '2'
                                                                    )
                                                                "
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
                                            <div v-if="item.bannerType == 1">
                                                <el-row>
                                                    <el-col
                                                        :span="3"
                                                        class="mb-2 mt-2"
                                                    >
                                                        选择模板:
                                                    </el-col>
                                                    <el-col :span="21"> </el-col>
                                                </el-row>
                                                <div>
                                                    <el-card
                                                        shadow="never"
                                                        class="text-center mb-2 p-2"
                                                    >
                                                        <el-row
                                                            class="d-flex align-items-center" style="position: relative"
                                                            v-for="(bannerItem,i) in item.contents" :key="i"
                                                        >
                                                            <el-col
                                                                :span="6"
                                                                class="mb-2 mt-2"
                                                            >
                                                                <i class="el-icon-error banner-del" @click="tapDelBanner(index,i)"></i>
                                                                <div
                                                                    class="img-preview"
                                                                >
                                                                    <img
                                                                        :src="bannerItem.data1"
                                                                        class="avatar border"
                                                                    />
                                                                    <label class="replace-img">
                                                                        <input type="file" 
                                                                            accept="image/png,image/gif,image/jpeg"
                                                                            @change="upLoadImg($event,i,'update',index)"
                                                                            :hidden="true"
                                                                        >
                                                                        更换图片
                                                                    </label>
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="18">
                                                                <div>
                                                                    跳转路径：
                                                                    <el-select
                                                                        v-model="
                                                                            bannerItem.value
                                                                        "
                                                                        placeholder="请选择"
                                                                    >
                                                                        <el-option
                                                                            v-for="item in bannerItem.action"
                                                                            :key="
                                                                                item.value
                                                                            "
                                                                            :label="
                                                                                item.label
                                                                            "
                                                                            :value="
                                                                                item.value
                                                                            "
                                                                        >
                                                                        </el-option>
                                                                    </el-select>
                                                                </div>
                                                                <!-- bannerItem.value == 0代表模板页 1代表详情 -->
                                                                <div class="mt-2" v-if="bannerItem.value == 0">
                                                                    模板路径：
                                                                    <el-input v-model="bannerItem.navurl" 
                                                                        class="d-inline-block" 
                                                                        style="width: 220px"
                                                                    >
                                                                    </el-input>
                                                                </div>
                                                                <div class="mt-2" v-else-if="bannerItem.value == 1">
                                                                    商品编号：
                                                                    <el-input v-model="bannerItem.navparam" 
                                                                        class="d-inline-block" 
                                                                        style="width: 220px"
                                                                    >
                                                                    </el-input>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </el-card>
                                                </div>
                                                <label class="update-banner">
                                                    <input 
                                                        type="file" :hidden="true"
                                                        accept="image/png,image/gif,image/jpeg"
                                                        @change="upLoadImg($event,'','add',index)"
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
                                                </label>
                                            </div>
                                            <div
                                                v-else-if="item.bannerType == 2"
                                                class="mt-2"
                                            >
                                                <el-row>
                                                    <el-col
                                                        :span="3"
                                                        class="mb-2 mt-2"
                                                    >
                                                        视频链接:
                                                    </el-col>
                                                    <el-col :span="21">
                                                        <el-input
                                                            size="small"
                                                            v-model="item.link"
                                                        ></el-input>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="block banner my-module"
                                slot="reference"
                                style="height: 155px"
                            >
                                <span
                                    class="add-icon"
                                    @click="AddModule('1', $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_02.png"
                                        alt=""
                                    />
                                </span>
                                <span
                                    class="del-icon"
                                    @click="DelModule(index, $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_01.png"
                                        alt=""
                                    />
                                </span>
                                <div v-if="item.bannerType == 1">
                                     <el-carousel
                                        trigger="click"
                                        arrow="never"
                                        height="150px"
                                        v-if="item.contents.length > 0"
                                    >
                                        <el-carousel-item
                                            v-for="(item,s) in item.contents"
                                            :key="s"
                                        >
                                            <img
                                                :src="item.data1"
                                                alt=""
                                                class="banner-img"
                                            />
                                        </el-carousel-item>
                                    </el-carousel>
                                    <el-carousel
                                        trigger="click"
                                        arrow="never"
                                        height="150px"
                                        v-else
                                    >
                                        <el-carousel-item
                                            v-for="item in 4"
                                            :key="item"
                                        >
                                            <h3 class="small">
                                                {{ item }}
                                            </h3>
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>
                                <div v-else>
                                    <video
                                        :src="item.link"
                                        width="100%"
                                        height="150px"
                                        controls
                                        preload="auto"
                                    ></video>
                                </div>
                            </div>
                        </el-popover>
                        <!-- 图文导航 -->
                        <el-popover
                            placement="right"
                            width="600"
                            trigger="click"
                            v-if="item.controlName == 'navigation'"
                        >
                            <!-- 图文导航设置 -->
                            <div class="bg-light">
                                <div class="card">
                                    <div class="card-header">
                                        图文导航
                                    </div>
                                    <div class="card-body bg-light">
                                        <el-form
                                            ref="form"
                                            label-width="120px"
                                        >
                                            <el-form-item
                                                label="上间距"
                                                class="mb-0"
                                            >
                                                <el-slider
                                                    v-model="item.marginTop"
                                                ></el-slider>
                                            </el-form-item>
                                            <el-form-item
                                                label="左右间距"
                                                class="mb-0"
                                            >
                                                <el-slider
                                                    v-model="
                                                        item.marginLeftRight
                                                    "
                                                ></el-slider>
                                            </el-form-item>
                                            <el-form-item
                                                label="背景色"
                                                class="mb-0"
                                            >
                                                <el-color-picker
                                                    v-model="
                                                        item.background
                                                    "
                                                    show-alpha
                                                    :predefine="
                                                        predefineColors
                                                    "
                                                >
                                                </el-color-picker>
                                            </el-form-item>
                                        </el-form>
                                        <el-row>
                                            <el-col
                                                :span="3"
                                                class="mb-2 mt-2"
                                            >
                                                选择模板:
                                            </el-col>
                                            <el-col :span="21"> </el-col>
                                        </el-row>
                                        <div>
                                            <el-card
                                                shadow="never"
                                                class="text-center mb-2 p-2"
                                            >
                                                <template v-for="(navItem,i) in item.contents">
                                                    <el-row
                                                        class="d-flex align-items-center"
                                                        :key="i" style="position: relative"
                                                    >
                                                        <el-col
                                                            :span="6"
                                                            class="mb-2 mt-2"
                                                        >
                                                            <i class="el-icon-error banner-del" @click="tapDelBanner(index,i)"></i>
                                                            <div
                                                                class="img-preview"
                                                            >
                                                                <img
                                                                    :src="navItem.data1"
                                                                    class="avatar border"
                                                                />
                                                                <label class="replace-img">
                                                                    <input type="file" 
                                                                        accept="image/png,image/gif,image/jpeg"
                                                                        @change="upLoadImg($event,i,'update',index)"
                                                                        :hidden="true"
                                                                    >
                                                                    更换图片
                                                                </label>
                                                            </div>
                                                        </el-col>
                                                        <el-col :span="18">
                                                            <div>
                                                                导航名称：
                                                                <el-input v-model="navItem.data2" 
                                                                    class="d-inline-block" 
                                                                    style="width: 220px"
                                                                >
                                                                </el-input>
                                                            </div>
                                                            <div class="mt-2">
                                                                跳转路径：
                                                                <el-select
                                                                    v-model="
                                                                        navItem.value
                                                                    "
                                                                    placeholder="请选择"
                                                                >
                                                                    <el-option
                                                                        v-for="item in navItem.action"
                                                                        :key="
                                                                            item.value
                                                                        "
                                                                        :label="
                                                                            item.label
                                                                        "
                                                                        :value="
                                                                            item.value
                                                                        "
                                                                    >
                                                                    </el-option>
                                                                </el-select>
                                                            </div>
                                                            <!-- navItem.value == 0代表模板页 1代表详情 -->
                                                            <div class="mt-2" v-if="navItem.value == 0">
                                                                模板路径：
                                                                <el-input v-model="navItem.navurl" 
                                                                    class="d-inline-block" 
                                                                    style="width: 220px"
                                                                >
                                                                </el-input>
                                                            </div>
                                                            <div class="mt-2" v-else-if="navItem.value == 1">
                                                                商品编号：
                                                                <el-input v-model="navItem.navparam" 
                                                                    class="d-inline-block" 
                                                                    style="width: 220px"
                                                                >
                                                                </el-input>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </template>
                                            </el-card>
                                        </div>
                                        <label class="update-banner">
                                            <input 
                                                type="file" :hidden="true"
                                                accept="image/png,image/gif,image/jpeg"
                                                @change="upLoadImg($event,'','add',index)"
                                            >
                                            <el-card
                                                shadow="never"
                                                class="text-center"
                                                style="cursor: pointer"
                                            >
                                                <div class="text-primary">
                                                    添加一个图文导航
                                                </div>
                                            </el-card>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <!-- 图文导航 -->
                            <div
                                class="block my-module"
                                slot="reference"
                                :style="{
                                    backgroundColor: item.background,
                                    margin:
                                        item.marginTop +
                                        'px ' +
                                        item.marginLeftRight +
                                        'px 0'
                                }"
                            >
                                <span
                                    class="add-icon"
                                    @click="AddModule('2', $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_02.png"
                                        alt=""
                                    />
                                </span>
                                <span
                                    class="del-icon"
                                    @click="DelModule(index, $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_01.png"
                                        alt=""
                                    />
                                </span>
                                <el-carousel
                                    trigger="click"
                                    height="210px"
                                    arrow="never"
                                    :autoplay="false"
                                >
                                    <el-carousel-item
                                        v-for="i in 2"
                                        :key="i"
                                    >
                                        <div
                                            class="type-item"
                                            v-for="j in 8"
                                            :key="j"
                                        >
                                            <!-- 导航图片 -->
                                            <img v-if="item.contents[j-1]"
                                                :src="item.contents[j-1].data1"
                                            />
                                            <img v-else
                                                src="../../../../assets/images/default.png"
                                            />
                                            <!-- 导航文字 -->
                                            <span v-if="item.contents[j-1]">
                                                <template v-if="item.contents[j-1].data2 ==''">
                                                    图文导航
                                                </template>
                                                <template v-else>
                                                    {{item.contents[j-1].data2}}
                                                </template>
                                            </span>
                                            <span v-else>图文导航</span>
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-popover>
                        <!-- 标题 -->
                        <el-popover
                            placement="right"
                            width="600"
                            trigger="click"
                            v-if="item.controlName == 'TitleLable'"
                        >
                            <!-- 标题设置 -->
                            <div class="bg-light">
                                <div class="card">
                                    <div class="card-header">
                                        标题
                                    </div>
                                    <div class="card-body bg-light">
                                        <el-form
                                            ref="form"
                                            label-width="120px"
                                        >
                                            <el-form-item
                                                label="标题名"
                                                class="mb-0"
                                            >
                                                <el-input
                                                    size="small"
                                                    v-model="
                                                        item.contents[0]
                                                            .data1
                                                    "
                                                ></el-input>
                                            </el-form-item>
                                            <el-form-item
                                                label="文本样式"
                                                class="mb-0"
                                            >
                                                <el-radio-group
                                                    v-model="
                                                        item.params
                                                            .textWeight
                                                    "
                                                >
                                                    <el-radio :label="false"
                                                        >常规体</el-radio
                                                    >
                                                    <el-radio :label="true"
                                                        >加粗体</el-radio
                                                    >
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item
                                                label="主标题字体色"
                                                class="mb-0"
                                            >
                                                <el-color-picker
                                                    v-model="
                                                        item.params
                                                            .textColor
                                                    "
                                                    show-alpha
                                                    :predefine="
                                                        predefineColors
                                                    "
                                                >
                                                </el-color-picker>
                                            </el-form-item>
                                            <el-form-item
                                                label="显示位置"
                                                class="mb-0"
                                            >
                                                <el-radio-group
                                                    v-model="
                                                        item.params
                                                            .textAlign
                                                    "
                                                >
                                                    <el-radio label="left"
                                                        >靠左显示</el-radio
                                                    >
                                                    <el-radio label="center"
                                                        >居中显示</el-radio
                                                    >
                                                    <el-radio label="right"
                                                        >靠右显示</el-radio
                                                    >
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item
                                                label="副标题"
                                                class="mb-0"
                                            >
                                                <el-input
                                                    size="small"
                                                    v-model="
                                                        item.contents[0]
                                                            .data2
                                                    "
                                                ></el-input>
                                            </el-form-item>
                                            <el-form-item
                                                label="副标题字体色"
                                                class="mb-0"
                                            >
                                                <el-color-picker
                                                    v-model="
                                                        item.params.subColor
                                                    "
                                                    show-alpha
                                                    :predefine="
                                                        predefineColors
                                                    "
                                                >
                                                </el-color-picker>
                                            </el-form-item>
                                            <el-form-item
                                                label="背景色"
                                                class="mb-0"
                                            >
                                                <el-color-picker
                                                    v-model="
                                                        item.background
                                                    "
                                                    show-alpha
                                                    :predefine="
                                                        predefineColors
                                                    "
                                                >
                                                </el-color-picker>
                                            </el-form-item>
                                            <el-form-item
                                                label="顶端边距"
                                                class="mb-0"
                                            >
                                                <el-slider
                                                    v-model="item.marginTop"
                                                ></el-slider>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 标题展示 -->
                            <div
                                class="block headline my-module"
                                slot="reference"
                                :class="
                                    item.params.textAlign == 'left'
                                        ? 'text-left'
                                        : item.params.textAlign == 'center'
                                        ? 'text-center'
                                        : 'text-right'
                                "
                                :style="{
                                    marginTop: item.marginTop + 'px',
                                    backgroundColor: item.background,
                                    height: 65 + 'px'
                                }"
                            >
                                <span
                                    class="add-icon"
                                    @click="AddModule('3', $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_02.png"
                                        alt=""
                                    />
                                </span>
                                <span
                                    class="del-icon"
                                    @click="DelModule(index, $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_01.png"
                                        alt=""
                                    />
                                </span>
                                <div
                                    class="title-big"
                                    :style="{
                                        color: item.params.textColor,
                                        fontWeight: item.params.textWeight
                                            ? 'blod'
                                            : 'normal'
                                    }"
                                >
                                    {{ item.contents[0].data1 }}
                                </div>
                                <div
                                    class="title-small"
                                    :style="'color:' + item.params.subColor"
                                >
                                    {{ item.contents[0].data2 }}
                                </div>
                            </div>
                        </el-popover>
                        <!-- 商品列表 -->
                        <el-popover
                            placement="right"
                            width="600"
                            trigger="click"
                            v-if="item.controlName == 'ProductAd'"
                        >
                            <!-- 商品设置 -->
                            <div class="bg-light">
                                <div class="card">
                                    <div class="card-header">
                                        商品
                                    </div>
                                    <div class="card-body bg-light">
                                        <el-form
                                            ref="form"
                                            label-width="120px"
                                        >
                                            <el-form-item
                                                label="商品添加"
                                                class="mb-0"
                                            >
                                            <div class="d-flex flex-row">
                                                <!-- 已添加的商品 -->
                                                <template v-if="item.contents.length > 0">
                                                    <div class="shop-list-add rounded mr-2"
                                                        v-for="(shopItem, i) in item.contents"
                                                        :key="i"
                                                    >
                                                        <img :src="shopItem.data1" alt="">
                                                        <i class="el-icon-error" @click="tapDelShop(index,i)"></i>
                                                    </div>
                                                </template>
                                                <div class="shop-list-add rounded text-center"
                                                    @click="tapAddShop(index,item.contents.length)"
                                                >
                                                    <i class="el-icon-plus text-primary"></i>
                                                </div>
                                            </div>
                                            </el-form-item>
                                            <el-form-item
                                                label="列表样式"
                                                class="mb-0"
                                            >
                                                <el-radio-group
                                                    v-model="
                                                        item.params
                                                            .listStyle
                                                    "
                                                >
                                                    <el-radio
                                                        label="style_02"
                                                        >大图模式</el-radio
                                                    >
                                                    <el-radio label=""
                                                        >一行两个</el-radio
                                                    >
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item
                                                label="页面边距"
                                                class="mb-0"
                                            >
                                                <el-slider
                                                    v-model="
                                                        item.marginLeftRight
                                                    "
                                                    :max="30"
                                                ></el-slider>
                                            </el-form-item>
                                            <el-form-item
                                                label="顶端边距"
                                                class="mb-0"
                                            >
                                                <el-slider
                                                    v-model="item.marginTop"
                                                    :max="30"
                                                ></el-slider>
                                            </el-form-item>
                                            <el-form-item
                                                label="图片比例"
                                                class="mb-0"
                                            >
                                                <el-radio-group
                                                    v-model="
                                                        item.params.imgScale
                                                    "
                                                >
                                                    <el-radio label="3_2"
                                                        >3:2</el-radio
                                                    >
                                                    <el-radio
                                                        label="default"
                                                        >1:1</el-radio
                                                    >
                                                </el-radio-group>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 商品展示 -->
                            <div
                                class="block my-module"
                                slot="reference"
                            >
                                <span
                                    class="add-icon"
                                    @click="AddModule('4', $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_02.png"
                                        alt=""
                                    />
                                </span>
                                <span
                                    class="del-icon"
                                    @click="DelModule(index, $event)"
                                >
                                    <img
                                        src="../../../../assets/images/icon/icon_01.png"
                                        alt=""
                                    />
                                </span>
                                <!-- style_02 -->
                                <div
                                    :style="{
                                        margin:
                                            '0px ' +
                                            item.marginLeftRight +
                                            'px'
                                    }"
                                    class="commodity-list-style1"
                                    v-if="
                                        item.params.listStyle == 'style_02'
                                    "
                                >
                                    <template v-if="item.contents.length > 0">
                                        <div
                                            class="commodity-item"
                                            v-for="(shopInfo,i) in item.contents"
                                            :key="i"
                                            :style="{
                                                marginTop: item.marginTop + 'px'
                                            }"
                                        >
                                            <div
                                                class="img-1_1"
                                                v-if="
                                                    item.params.imgScale ==
                                                        'default'
                                                "
                                            >
                                                <img
                                                    :src="shopInfo.data1"
                                                    mode=""
                                                />
                                            </div>
                                            <div
                                                class="img-3_2"
                                                v-else-if="
                                                    item.params.imgScale ==
                                                        '3_2'
                                                "
                                            >
                                                <img
                                                    :src="shopInfo.data1"
                                                    mode=""
                                                />
                                            </div>
                                            <div class="commodity-title">
                                                {{shopInfo.data2}}
                                            </div>
                                            <div class="commodity-foot">
                                                <div>
                                                    <span
                                                        class="text-danger mr-1"
                                                        style="font-size: 16px"
                                                        v-if="shopInfo.data4 !=''"
                                                        >¥{{shopInfo.data4}}</span
                                                    >
                                                    <s
                                                        class="text-black-50 text-sm"
                                                        style="font-size: 12px"
                                                        v-if="shopInfo.data3 !=''"
                                                        >¥{{shopInfo.data3}}</s
                                                    >
                                                </div>
                                                <el-button
                                                    type="danger"
                                                    size="mini"
                                                    >详情</el-button
                                                >
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div
                                            class="commodity-item"
                                            v-for="i in 1"
                                            :key="i"
                                            :style="{
                                                marginTop: item.marginTop + 'px'
                                            }"
                                        >
                                            <div
                                                class="img-1_1"
                                                v-if="
                                                    item.params.imgScale ==
                                                        'default'
                                                "
                                            >
                                                <img
                                                    src="../../../../assets/images/default.png"
                                                    mode=""
                                                />
                                            </div>
                                            <div
                                                class="img-3_2"
                                                v-else-if="
                                                    item.params.imgScale ==
                                                        '3_2'
                                                "
                                            >
                                                <img
                                                    src="../../../../assets/images/default.png"
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
                                                <el-button
                                                    type="danger"
                                                    size="mini"
                                                    >详情</el-button
                                                >
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <!-- 一行两个 -->
                                <div
                                    :style="{
                                        margin:
                                            '0px ' +
                                            item.marginLeftRight +
                                            'px',
                                        minHeight: 225 + 'px'
                                    }"
                                    class="commodity-list-style2"
                                    v-else-if="item.params.listStyle == '' || item.params.listStyle == null"
                                >
                                    <template v-if="item.contents.length > 0">
                                        <div
                                            class="commodity-item"
                                            v-for="(shopInfo,i) in item.contents"
                                            :key="i"
                                            :style="{
                                                marginTop: item.marginTop + 'px'
                                            }"
                                        >
                                            <div
                                                class="img-1_1"
                                                v-if="
                                                    item.params.imgScale ==
                                                        'default'
                                                "
                                            >
                                                <img
                                                    :src="shopInfo.data1"
                                                    mode=""
                                                />
                                            </div>
                                            <div
                                                class="img-3_2"
                                                v-else-if="
                                                    item.params.imgScale ==
                                                        '3_2'
                                                "
                                            >
                                                <img
                                                    :src="shopInfo.data1"
                                                    mode=""
                                                />
                                            </div>
                                            <div class="commodity-title">
                                                {{shopInfo.data2}}
                                            </div>
                                            <div class="commodity-foot">
                                                <div>
                                                    <div class="price-content">
                                                        <s
                                                            class="text-black-50 text-sm"
                                                            style="font-size: 12px"
                                                            v-if="shopInfo.data3!=''"
                                                            >¥{{shopInfo.data3}}</s
                                                        >
                                                    </div>
                                                    <span
                                                        class="text-danger mr-1"
                                                        style="font-size: 16px"
                                                        v-if="shopInfo.data4!=''"
                                                        >¥{{shopInfo.data4}}</span
                                                    >
                                                </div>
                                                <el-button
                                                    type="danger"
                                                    size="mini"
                                                    >详情</el-button
                                                >
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div
                                            class="commodity-item"
                                            v-for="i in 2"
                                            :key="i"
                                            :style="{
                                                marginTop: item.marginTop + 'px'
                                            }"
                                        >
                                            <div
                                                class="img-1_1"
                                                v-if="
                                                    item.params.imgScale ==
                                                        'default'
                                                "
                                            >
                                                <img
                                                    src="../../../../assets/images/default.png"
                                                    mode=""
                                                />
                                            </div>
                                            <div
                                                class="img-3_2"
                                                v-else-if="
                                                    item.params.imgScale ==
                                                        '3_2'
                                                "
                                            >
                                                <img
                                                    src="../../../../assets/images/default.png"
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
                                                <el-button
                                                    type="danger"
                                                    size="mini"
                                                    >详情</el-button
                                                >
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </el-popover>
                    </div>
                </transition-group>
            </draggable>
            <div v-else style="height:200px"></div>
            <div class="bg-white mt-2">
                <div class="module-title">
                    点击添加组件
                </div>
                <div class="p-2">
                    <el-button size="small" @click="AddModule('1', $event)"
                        >图文广告</el-button
                    >
                    <el-button size="small" @click="AddModule('2', $event)"
                        >图文导航</el-button
                    >
                    <el-button size="small" @click="AddModule('3', $event)"
                        >标题</el-button
                    >
                    <el-button size="small" @click="AddModule('4', $event)"
                        >商品</el-button
                    >
                </div>
            </div>
        </div>
        <!-- 商品信息录入弹框 -->
        <el-dialog
            title="添加商品"
            :visible.sync="shopPop"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            width="30%"
        >
            <el-form
                v-if="shopPop"
                label-width="80px"
            >
                <el-form-item
                    label="商品图片"
                    class="mb-0"
                >
                    <input 
                        type="file" 
                        accept="image/png,image/gif,image/jpeg"
                        @change="upLoadShopImg($event,moduleIndex,shopPopId)"
                    >
                </el-form-item>
                <el-form-item
                    label="商品名称"
                    class="mb-0"
                >
                    <el-input v-model="moduleList[moduleIndex].contents[shopPopId].data2"></el-input>
                </el-form-item>
                <el-form-item
                    label="商品原价"
                    class="mb-0"
                >
                    <el-input v-model="moduleList[moduleIndex].contents[shopPopId].data3"></el-input>
                </el-form-item>
                <el-form-item
                    label="商品现价"
                    class="mb-0"
                >
                    <el-input v-model="moduleList[moduleIndex].contents[shopPopId].data4"></el-input>
                </el-form-item>
                <el-form-item
                    label="角标"
                    class="mb-0"
                >
                    <el-radio-group v-model="moduleList[moduleIndex].contents[shopPopId].data5">
                        <el-radio :label="0">无</el-radio>
                        <el-radio :label="1">新品</el-radio>
                        <el-radio :label="2">热卖</el-radio>
                        <el-radio :label="3">new</el-radio>
                        <el-radio :label="4">hot</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeShop(moduleIndex)">取 消</el-button>
                <el-button type="primary" @click="saveShop">确 定</el-button>
            </span>
        </el-dialog>
        <!-- end -->
        <!-- 操作按钮 -->
        <footer class="my-footer border-top d-flex align-items-center bg-white">
            <el-button @click="saveTemplate" type="primary">保存</el-button>
            <el-button>取消</el-button>
        </footer>
    </el-card>
</template>

<script>
import { post,uploadFile } from "@/common/net/axios-cfg";
import draggable from "vuedraggable";
export default {
    name: "",
    data() {
        return {
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
            pageTemplate: {
                title: "购物商城",
                describe: "",
                isResult: true,
                isMain: false,
                datetime: "",
                backgroundColor: "#F8F8F8"
            },
            moduleList: [],
            shopPop: false,
            shopPopId: 0,
            moduleIndex: null,
            drag: null
        };
    },
    components: {
        draggable
    },
    methods: {
        // 保存模板
        async saveTemplate() {
            // 页面类型 是否为主页 0普通,10主页
            let pageType = this.pageTemplate.isMain;
            if (pageType) {
                pageType = 10;
            } else {
                pageType = 0;
            }
            let res = await post("/api/weiadm/v1/wapage/add", {
                background: this.pageTemplate.backgroundColor,
                controls: this.moduleList,
                createDate: "",
                effectiveDate: this.pageTemplate.datetime,
                isActive: this.pageTemplate.isResult,
                pageType: pageType,
                pageName: this.pageTemplate.title,
                shopId: 1001
            });
            if(res.status == 0) {
                this.$message({
                    type: "success",
                    message: "添加成功!"
                });
                setTimeout(()=> {
                    this.$router.push('template_page_index')
                },2000)
            } else {
                 this.$message.error(res.msg);
            }
        },
        // 图片上传 => 图文广告 & 导航菜单
        async upLoadImg(event,id,tag,serial) {
            // id记录图片所在数组的下标 serial记录广告图片在moduleList的位置
            let res = await uploadFile(event.target.files[0],'img')
            if(tag == 'add') {
                // 添加图片
                // this.moduleList[serial].contents[0].data1.push(res.data)
                this.moduleList[serial].contents.push({
                    data1: res.data,
                    data2: '',
                    action: [
                        {
                            value: "0",
                            label: "模板页"
                        },
                        {
                            value: "1",
                            label: "详情页"
                        }
                    ],
                    value: '0', // 当前下拉框选择的值
                    navurl: '',
                    navparam: ''
                })
            } else if(tag == 'update') {
                // 修改图片
                // this.moduleList[serial].contents[0].data1.splice(id,1,res.data)
                this.moduleList[serial].contents.id.data1 = res.data
            }else {
                return
            }
        },
        // 删除上传的图文广告 && 删除上传的图文导航
        tapDelBanner(index,id) {
            this.moduleList[index].contents.splice(id,1)
        },
        // 广告图片选择模板类型
        selectTemplate(index, tag) {
            this.moduleList[index].bannerType = tag;
        },
        // 添加组件
        AddModule(tag, e) {
            e.stopPropagation();
            if (tag == 1) {
                this.moduleList.push({
                    controlName: "ImageAd",
                    bannerType: "1",
                    contents: [],
                    link: "http://47.104.236.24:8089/jademp4/jade.mp4"
                });
            } else if (tag == 2) {
                this.moduleList.push({
                    controlName: "navigation",
                    marginLeftRight: 0,
                    marginTop: 10,
                    background: "#ffffff",
                    contents: []
                });
            } else if (tag == 3) {
                this.moduleList.push({
                    controlName: "TitleLable",
                    background: "#ffffff",
                    marginTop: 10,
                    contents: [
                        {
                            data1: "主标题",
                            data2: "副标题"
                        }
                    ],
                    params: {
                        textWeight: true,
                        textAlign: "center",
                        textColor: "#333333",
                        subColor: "#999999"
                    }
                });
            } else if (tag == 4) {
                this.moduleList.push({
                    controlName: "ProductAd",
                    marginLeftRight: 0,
                    marginTop: 10,
                    contents: [],
                    params: {
                        imgScale: "default",
                        listStyle: ""
                    }
                });
            } else {
                return;
            }
            console.log(this.moduleList)
            this.$message({
                type: "success",
                message: "添加成功!"
            });
        },
        // 打开添加商品弹框
        tapAddShop(index,id) {
            if(id > 7) {
                this.$message.error('最多可添加8个商品')
            } else {
                this.shopPop = true
                // shopPopId记录是添加的第几个商品
                this.shopPopId = id
                // 当前模板的下标
                this.moduleIndex = index
                this.moduleList[index].contents.push({
                    data1: require('../../../../assets/images/default.png'),
                    data2: '',
                    data3: '',
                    data4: '',
                    data5: 0
                })
            }
        },
        // 取消商品添加
        closeShop(index) {
            this.shopPop = false
            this.moduleList[index].contents.pop()
        },
        // 保存商品
        saveShop() {
            this.shopPop = false
        },
        // 商品图片上传
        async upLoadShopImg(event,index,id) {
            let res = await uploadFile(event.target.files[0],'img')
            this.moduleList[index].contents[id].data1 = res.data
        },
        // 删除已上传的商品
        tapDelShop(index,id) {
            this.moduleList[index].contents.splice(id,1)
        },
        // 删除组件
        DelModule(id, e) {
            e.stopPropagation();
            this.$confirm("确认删除当前组件?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.moduleList.splice(id, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
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
            this.moduleList.forEach((item, index) => {
                item.sortId = index;
            });
            console.log(evt, this.moduleList, "end....");
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

<style>
.el-popover {
    max-height: 90%;
    overflow-y: auto;
}
.el-upload {
    display: block;
}
.p-2 .el-card__body {
    padding: 0;
}
/* 轮播图指示点的颜色 */
.el-carousel__button {
    background-color: #000;
}
</style>

<style scoped>
.page {
    position: relative;
}

.page-title {
    position: absolute;
    left: 50%;
    bottom: 15px;
    color: #040404;
    font-weight: bold;
    transform: translateX(-50%);
}

.module-title {
    font-size: 13px;
    padding: 10px 10px 0;
}

.phone {
    width: 375px;
    border: 1px solid #ccc;
    /* display: flex;
    flex-direction: column;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden; */
}
.banner .el-carousel__item h3 {
    color: #181f29;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.banner .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.banner .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.my-module {
    width: 373px;
    border: 1px solid transparent;
    padding: 1px;
    position: relative;
    transition: all linear 0.3s;
}
.add-icon,
.del-icon {
    display: none;
    position: absolute;
    top: -13px;
    z-index: 999;
    cursor: pointer;
}
.add-icon img,
.del-icon img {
    width: 16px;
    height: 16px;
}
.add-icon {
    left: 50%;
    margin-left: -8px;
}
.del-icon {
    right: -8px;
}
.my-module:hover .add-icon,
.my-module:hover .del-icon {
    display: inline-block;
}
.my-module:hover {
    border: 1px solid #409eff;
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
    margin: 0;
    color: #fff;
}
.update-banner {
    display: block;
}

.banner-img {
    width: 100%;
    height: 100%;
}
.banner-del {
    font-size:30px;
    position:absolute;
    right:0;
    top:0;
    color: #999;
    cursor: pointer;
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
/* 商品信息添加 */
.shop-list-add {
    border: 1px dashed #DDDDDD;
    width: 50px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    position: relative;
}

.shop-list-add .el-icon-error {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 20px;
}

.shop-list-add img {
    width: 100%;
    height: 100%;
}

.el-icon-plus{
    font-size: 22px;
    font-weight: bold;
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

.commodity-item img {
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

.commodity-foot img {
    width: 20px;
    height: 20px;
    align-items: center;
}
/* 商品样式  */
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
/* 图文导航 */
.type-content {
    padding-bottom: 20px;
}

.type-list {
    padding: 20px 0;
    overflow: hidden;
}

.type-item {
    width: 25%;
    float: left;
    text-align: center;
    padding-top: 10px;
    margin-bottom: 10px;
}

.type-item img {
    display: block;
    margin: 0 auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.type-item span {
    font-size: 12px;
}
</style>
