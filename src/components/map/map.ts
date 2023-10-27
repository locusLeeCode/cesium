// 封账cesium地图框架
import * as Cesium from "cesium";
export default class CesiumMap {
  private viewer: any;
  private option: any;

  constructor(option: any) {
    this.option = option;
  }

  initMap(id: string | Element) {
    this.viewer = new Cesium.Viewer(id, {
      animation: false, // 动画部件
      baseLayerPicker: false, // 基础图层部件
      fullscreenButton: false, // 全屏按钮部件
      vrButton: false, // vr部件
      geocoder: false, // 位置搜索部件
      homeButton: false, // home按钮
      infoBox: false, // 消息框部件
      sceneModePicker: false, // 二三维切换部件
      selectionIndicator: false,
      timeline: false, // 时间轴部件
      navigationHelpButton: false, // 导航帮助按钮
      navigationInstructionsInitiallyVisible: false, // 导航说明显示
      scene3DOnly: true, // 当设置为true时，每个几何图形实例将仅以3D形式呈现，以节省GPU内存。
      shouldAnimate: false, // 太阳模拟时钟时间
      // clockViewModel: new Cesium.ClockViewModel(clock),  // 当shouldAnimate为ture,执行当前设置的时间区间动画
      // selectedImageryProviderViewModel:{}, // 当前基础影像图层，如果设置将使用第一个可用的基础图层。仅当“ baseLayerPicker”设置为true时，此值才有效。
      // imageryProviderViewModels: [],  //可以从BaseLayerPicker中选择的ProviderViewModels数组。仅当“ baseLayerPicker”设置为true时，此值才有效。
      // selectedTerrainProviderViewModel: new Cesium.ProviderViewModel(options) // 当前基础地形图层的视图模型（如果未提供）将使用第一个可用的基础图层。仅当“ baseLayerPicker”设置为true时，此值才有效。
      // terrainProviderViewModels: [],   // 可以从BaseLayerPicker中选择的ProviderViewModels数组。仅当“ baseLayerPicker”设置为true时，此值才有效。
      // imageryProvider: // 加载不同的地图服务。仅当“ baseLayerPicker”设置为false时，此值才有效。
      // terrainProvider: // 加载地形服务
      // skyBox: false,  // 配置天空盒子或不显示天空盒子
      // skyAtmosphere: false, // 配置大气或不显示大气
      // fullscreenElement: '',  // 配置全屏按钮，传入id或者dom
      useDefaultRenderLoop: true, // 控制是否继续渲染
      // targetFrameRate:24, // 控制渲染帧数
      showRenderLoopErrors: true, // 报错是否弹出错误
      useBrowserRecommendedResolution: true, // 设置为false使用window.devicePixelRatio属性
      automaticallyTrackDataSourceClocks: false, // 设置成true，使用公共clock对象，设置false，所有功能使用独立clock对象
      contextOptions: {}, // 创建场景时，配置webgl
      sceneMode: Cesium.SceneMode.SCENE3D, // 初始化场景为3D、2.5D、2D
      // mapProjection:new GeographicProjection(),   // 使用2D 或者 Columbus View modes 设置地图投影方式
      //globe: false, // 配置新的地球或隐藏地球
      orderIndependentTranslucency: true, // 如果为true且配置支持，则使用顺序无关的透明性。
      // creditViewport: '', // 提示显示容器
      // dataSources: new Cesium.DataSourceCollection(), // 小部件数据源设置
      //   terrainExaggeration: 1.0, // 夸大地形
      shadows: true, // 是否打开阴影
      terrainShadows: Cesium.ShadowMode.DISABLED, // 是否打开地形阴影
      mapMode2D: Cesium.MapMode2D.INFINITE_SCROLL, // 设置2D地图水平旋转
      projectionPicker: false, // 设置为true,  ProjectionPicker部件会被创建,    ProjectionPicker：设置地球最佳视角
      // 如果为真，渲染帧只会在需要时发生，这是由场景中的变化决定的。启用可以减少你的应用程序的CPU/GPU使用，并且在移动设备上使用更少的电池，但是需要使用Scene#requestRender在这种模式下显式地渲染一个新帧。在许多情况下，在API的其他部分更改场景后，这是必要的。请参阅使用显式呈现提高性能。
      // 不是特别明白，应该是提高渲染性能的
      requestRenderMode: true,
      // 如果requestRenderMode为true，这个值定义了在请求渲染之前允许的模拟时间的最大变化。请参阅使用显式呈现提高性能。
      maximumRenderTimeChange: 0.0,
    });
    // 地图当前视角
    let center = {
      lat: 33.31273323258514,
      lng: 120.39086019834487,
      height: 320544.9999996388,
      heading: 360.0,
      pitch: -90.0,
      roll: 0.0,
    };
    //重新设置默认相机视角
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        center.lng,
        center.lat,
        center.height
      ),
      // 方向，俯视和仰视的视角
      orientation: {
        heading: Cesium.Math.toRadians(center.heading), //坐标系旋转90度
        pitch: Cesium.Math.toRadians(center.pitch), //设置俯仰角度为-45度
        roll: Cesium.Math.toRadians(center.roll),
      },
    });

    return this.viewer;
  }

  /**
   * 是否关闭地图自带的底图图层（图层还在不是删除）
   * @param {boolean} val
   * 默认关闭
   */
  setBaseMapLayer(val = false) {
    // this.viewer.imageryLayers.get(0)获地图第一个底图的一些信息
    if (!this.viewer.imageryLayers.get(0)?.show) return;
    this.viewer.imageryLayers.get(0).show = val;
  }
  /**
   * 清除所有地图底图（图层已删除）
   */
  removeBaseMapLayers(layer: any = null) {
    if (layer && layer != "all") {
      this.viewer.imageryLayers.remove(layer);
    } else {
      this.viewer.imageryLayers.removeAll();
    }
  }

  /**
   * 获取地图当前所有底图
   */
  getBaseMapLayerAll() {
    return this.viewer.imageryLayers._layers;
  }

  /**
   * 添加地图底图
   * @param {*} 字段
   * 必填url和layer  {}
   */
  changeImageryLayers_tianditu(option: any) {
    // 不显示地图自带的默认底图
    this.setBaseMapLayer();
    // 添加天地图影像注记底图
    // https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=849&y=416&z=10
    // http://t0.tianditu.gov.cn/cva_w/wmts?tilematrix=8&layer=cva&style=default&tilerow=100&tilecol=214&tilematrixset=w&format=tiles&service=WMTS&version=1.0.0&request=GetTile&tk=77c95977eef101e67eb6ba1b52d255d3
    // const tMapImagery = new Cesium.WebMapTileServiceImageryProvider({
    //   url: `http://t0.tianditu.gov.cn/cva_w/wmts?tk=77c95977eef101e67eb6ba1b52d255d3`, //天地图
    //   layer: "cva", //WMTS请求的层名称
    //   style: "default", //WMTS请求的样式名称。
    //   tileMatrixSetID: "w", //用于WMTS请求的TileMatrixSet的标识符。
    //   format: "tiles", //从服务器检索图像的MIME类型。
    //   maximumLevel: 18, //图像提供程序支持的最大详细程度，如果没有限制，则为未定义。
    //   ...option,
    // });
    // this.viewer.imageryLayers.addImageryProvider(tMapImagery);

    let tdtLayer = new Cesium.UrlTemplateImageryProvider({
      url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      minimumLevel: 3,
      maximumLevel: 18,
    });
    this.viewer.imageryLayers.addImageryProvider(tdtLayer);
  }

  loadOnlineMapLayer(mapName: any, type: any) {
    console.log(this.getBaseMapLayerAll());
    

    switch (mapName) {
      case "gaode":
        // 含注记
        if (type == "vec") {
          let tdtLayer = new Cesium.UrlTemplateImageryProvider({
            url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            minimumLevel: 3,
            maximumLevel: 18,
          });
          this.viewer.imageryLayers.addImageryProvider(tdtLayer);
        } else if (type == "img") {
          // 影像图
          let tdtLayer = new Cesium.UrlTemplateImageryProvider({
            url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            minimumLevel: 3,
            maximumLevel: 18,
          });
          this.viewer.imageryLayers.addImageryProvider(tdtLayer);
          //   路网
          let tdtLayer2 = new Cesium.UrlTemplateImageryProvider({
            url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
            minimumLevel: 3,
            maximumLevel: 18,
          });
          this.viewer.imageryLayers.addImageryProvider(tdtLayer2);
        }

        break;

      default:
        break;
    }
  }
  flyTo(option: any) {
    let center = {
      lat: "",
      lng: "",
      height: 320544.9999996388,
      heading: 360.0,
      pitch: -90.0,
      roll: 0.0,
      ...option,
    };
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        center.lng,
        center.lat,
        center.height
      ),
      // 方向，俯视和仰视的视角
      orientation: {
        heading: Cesium.Math.toRadians(center.heading), //坐标系旋转90度
        pitch: Cesium.Math.toRadians(center.pitch), //设置俯仰角度为-45度
        roll: Cesium.Math.toRadians(center.roll),
      },
    });
  }
}
