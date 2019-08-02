<template>
  <div class="top-panel-container">
    <el-card shadow="hover" :body-style="{ padding: '16px 32px', width: '100%' }" class="tool-bar">
      <el-row>
        <el-col :span="24" type="flex" align="center" justify="center">
          <span class="logo-title">REX</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top-panel-container {
  display: flex;
}
.el-card {
  background-color: transparent;
  background-image: linear-gradient(
    180deg,
    rgba(15, 0, 47, 0.856) 0%,
    rgba(3, 9, 32, 0.048) 100%
  );
  border: none;
  border-radius: 0;
  &.is-hover-shadow:hover {
    box-shadow: 0px 4px 10px 0 rgb(222, 229, 254);
  }
  &.is-hover-shadow:focus {
    box-shadow: 0px 4px 10px 0 rgb(222, 229, 254);
  }
}
.logo-title {
  font-size: 48px;
  color: wheat;
}
.hs-container {
  height: 100%;
  overflow: hidden;
}
.tool-bar {
  width: 100%;
  display: flex;
  flex: 1 1 5%;
}
.tool-bar {
  position: absolute;
  top: 0;
  z-index: 1;
}
</style>