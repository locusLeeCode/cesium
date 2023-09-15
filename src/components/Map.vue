<template>
<div id="CesiumContainer"></div>
</template>
<script setup>
import {onMounted, } from 'vue'
import * as Cesium from "cesium";
onMounted(() => {
Cesium.Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzI4ZDg1YS1lNGJjLTRiOTMtYjNhZi0zNjY1OWJkZTgwY2MiLCJpZCI6OTg5NTQsImlhdCI6MTY1NjEzNDA1NH0.zoRd-akU-4Pbar6D3GC0VNkiABdTIhNEF55DvZpVZao"
const viewer = new Cesium.Viewer("CesiumContainer", {
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
  });

})
//抛出方法变量给ref父级访问
//defineExpose({})
 
</script> 
<style  scoped>
 #CesiumContainer {
 margin: 0px;
 padding: 0px;
 height: 100%;
 width: 100%;
}
</style>