<template>
  <div class="modal fade" id="myModalTrade" tabindex="-1" role="dialog" aria-labelledby="myModalTrade">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-xs-5 left-col text-center">
              <h3>{{ team1 }}</h3>
              <img :src="team1Logo" height="120px" width="120px" class="logo"/>
            </div>
            <div class="col-xs-1 text-center">
              <span class="glyphicon glyphicon-transfer" area-hidden="true"></span>
            </div>
            <div class="col-xs-5 right-col text-center">
              <h3>{{ team2 }}</h3>
              <img :src="team2Logo" height="120px" width="120px" class="logo"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: [ 'team1', 'team2', 'team1Logo', 'team2Logo'],
  data(){
    return {}
  }
}
</script>

<style scoped>

.modal-content {
  border: 5px solid #33B17D;
  overflow: hidden;
  -webkit-border-radius: 5px !important;
  -moz-border-radius: 5px !important;
  border-radius: 5px !important;
}

.modal-header {
  background-color: black;
  border-bottom: 5px solid #33B17D;
}

.modal-body {
  padding: 5px 5px 0px 5px;
  background-color: black;
  margin-bottom: 0px;
}

.close {
  color: #fff;
  opacity: 1;
  text-shadow: none;
}
.close:hover {
  color: #33B17D;
  text-shadow: none;
  outline: none;
}

.modal-dialog {
  padding-top: 15%;
}

.header-success {
  color: #33B17D;
  font-size: 15px;
}
h3 {
  color: #fff;
  font-size: 18px;
  text-align: center;
}
img {
  margin-top: 20px;
  margin-bottom: 20px;
}

.col-xs-5 {
  padding: none;
}
.left-col {
  margin-left: 18px;
}
.col-xs-1 {
  padding: none;
}
.glyphicon-transfer {
  background-color: transparent;
  color: #33B17D;
  margin-top: 100px;
  font-size: 40px;
}
.right-col {
  margin-left: 18px;
}
.logo {
  margin-bottom: 30px;
}
</style>
