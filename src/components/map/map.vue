<template>
    <div id="map">
    </div>
</template>
  
<script setup>
import { onMounted } from 'vue'
import * as Cesium from "cesium";
import CesiumMap from './map'
onMounted(() => {
    let Map = new CesiumMap()
    // 初始化地图
    Map.initMap('map', {})
    Map.loadOnlineMapLayer('gaode', 'vec')
})
</script>
  
<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

#map {
    height: 100%;
    width: 100%
}

/* 隐藏底部的图标 */
::v-deep .cesium-viewer-bottom {
    display: none !important;
}
</style>
  