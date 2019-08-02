<template>
  <div class="kanban-container">
    <top-panel></top-panel>
    <!-- <cesium-viewer></cesium-viewer> -->
    <map-viewer></map-viewer>
    <!-- <echarts-viewer></echarts-viewer> -->
  </div>
</template>

<script>
import TopPanel from "@/components/TopPanel";
import CesiumViewer from "@/components/CesiumViewer";
import MapViewer from "@/components/Map/MapViewer";
import EchartsViewer from "@/components/EchartsViewer";
export default {
  name: "KanBan",
  components: { TopPanel, CesiumViewer, MapViewer,EchartsViewer }
};
</script>

<style lang="scss" scoped>
.kanban-container {
  position: relative;
  height: 100%;
}
</style>