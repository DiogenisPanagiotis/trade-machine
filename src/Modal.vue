<template>


  <div class="modal fade" id="myModalTrade" tabindex="-1" role="dialog" aria-labelledby="myModalTrade">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="closeModal" aria-hidden="true">&times;</span></button>
          <span class="header-success">Transaction Overview.</span><span class="glyphicon glyphicon-ok success" aria-hidden="true"></span>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-xs-6 text-center">
              <h3>{{ team1 }}</h3>
              <img :src="team1Logo" height="120px" width="120px" />
            </div>
            <div class="col-xs-6 text-center">
              <h3>{{ team2 }}</h3>
              <img :src="team2Logo" height="120px" width="120px" />
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
    return {

    }
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
  /*margin-top: 150px;*/
  background-color: black;
  border-bottom: 5px solid #33B17D;
}

.modal-body {
  padding: 5px 5px 0px 5px;
  /*border: 1px solid #33B17D;*/
  background-color: black;
  margin-bottom: 0px;
}

.close {
  color: #fff;
  opacity: 1;
  text-shadow: none;
  /*transition: 0.5s ease-out;*/
}
.close:hover {
  color: #33B17D;
  text-shadow: none;
  /*transform: rotate(360deg);*/
}

.modal-dialog {
  padding-top: 10%;
}

.header-success {
  color: #33B17D;
  font-size: 15px;
}
h3 {
  color: #fff;
  font-size: 18px;
}
img {
  margin-top: 20px;
  margin-bottom: 30px;
}

.col-xs-6 {
  padding: none;
}
</style>
