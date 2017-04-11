<template>
  <div> <!-- start -->
    {{ initiate() }}
    <div v-if="trading && !transitioning" class="top"></div>
    <div class="container mobileHide"> <!-- container -->
      <div class="row"> <!-- directions -->
        <div v-if="team !== 0" class="space"></div>
        <transition name="fade">
        <div v-if="directions && bool" class="col-xs-12 col-sm-4 col-sm-offset-4">
          <h2 class="title">NBA Trade Machine</h2>
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                  <a class="directions" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    How to use Trade Machine.
                  </a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                <ul class="list-group">
                  <li class="list-group-item how-to"><b>1. </b><span class="dir"> Select Team 1.</span></li>
                  <li class="list-group-item how-to"><b>2. </b><span class="dir"> Select Team 2.</span></li>
                  <li class="list-group-item how-to"><b>3. </b><span class="dir"> Trade players.</span></li>
                  <li class="list-group-item how-to"><b>4. </b><span class="dir dir-last"> Enjoy!</span></li>
                </ul>
              </div>
            </div>
            <button @click="hideDirections()" type="button" class="btn btn-success btn-lg"><span class="glyphicon glyphicon-thumbs-up"></span></button>
          </div>
        </div> <!-- directions -->
        </transition>
        <transition name="fade">
        <div v-if="!trading && !directions && transitioning"> <!-- selecting teams -->

          <div class="col-xs-12 col-sm-6 col-sm-offset-3">
            <div v-if="team === 1"><h2> TEAM {{ team }} </h2></div>
            <div v-if="team === 2"><h2> TEAM {{ team }} </h2></div>
          </div>

          <div class="col-xs-12 col-sm-6 col-sm-offset-3"> <!-- columns for collape well -->
            <div id="collapseExample1"> <!-- start collapse id -->
              <div class="well"> <!-- start well -->
                <div class="col-sm-3">
                  <li
                  class="list-well"
                  v-for="(team, index) in t1"
                  v-bind:key="team.teamName"
                  v-bind:data-index="index"
                  @click="selectTeam(team, team.teamName)"
                  >
                  <img class="logos" :src="team.logo" height="29" width="29" />
                  <span class="logos-name"> {{ team.abbreviation }}</span>
                  </li>
                </div>
                <div class="col-sm-3">
                  <li
                  class="list-well"
                  v-for="(team, index) in t2"
                  v-bind:key="team.teamName"
                  v-bind:data-index="index"
                  @click="selectTeam(team, team.teamName)"
                  >
                  <img class="logos" :src="team.logo" height="29" width="29" />
                  <span class="logos-name"> {{ team.abbreviation }}</span>
                  </li>
                </div>
                <div class="col-sm-3">
                  <li
                  class="list-well"
                  v-for="(team, index) in t3"
                  v-bind:key="team.teamName"
                  v-bind:data-index="index"
                  @click="selectTeam(team, team.teamName)"
                  >
                  <img class="logos" :src="team.logo" height="29" width="29" />
                  <span class="logos-name"> {{ team.abbreviation }}</span>
                  </li>
                </div>
                <div class="col-sm-3">
                  <li
                  class="list-well"
                  v-for="(team, index) in t4"
                  v-bind:key="team.teamName"
                  v-bind:data-index="index"
                  @click="selectTeam(team, team.teamName)"
                  >
                  <img class="logos" :src="team.logo" height="29" width="29" />
                  <span class="logos-name"> {{ team.abbreviation }}</span>
                  </li>
                </div>
                <div class="col-sm-3">
                  <li
                  class="list-well"
                  v-for="(team, index) in t5"
                  v-bind:key="team.teamName"
                  v-bind:data-index="index"
                  @click="selectTeam(team, team.teamName)"
                  >
                  <img class="logos" :src="team.logo" height="29" width="29" />
                  <span class="logos-name"> {{ team.abbreviation }}</span>
                  </li>
                </div>
              </div> <!-- end well -->
            </div> <!-- end collapse id -->
          </div> <!-- end columns for collape well -->
        </div></transition> <!-- end selecting teams -->
      </div> <!-- end container -->
    </div> <!-- end -->

    <!-- Mobile template-->
    <Modal class="mobileHide" :team1="team1" :team2="team2" :team1Logo="team1Logo" :team2Logo="team2Logo" ></Modal>
    <div class="mobileHide">
      <transition name="modal-fade">
        <Players v-if="trading && !transitioning" :team1="team1" :team2="team2" :team1Logo="team1Logo" :team2Logo="team2Logo"></Players>
      </transition>
    </div>
    <Mobile></Mobile>
  </div>
</template>

<script>
import Teams from '../data/teams.js';
import t1 from '../data/teamObject1.js';
import t2 from '../data/teamObject2.js';
import t3 from '../data/teamObject3.js';
import t4 from '../data/teamObject4.js';
import t5 from '../data/teamObject5.js';
import Mobile from './Mobile.vue';
import Players from './Players.vue';
import Modal from './Modal.vue';
import utils from '../utils.js';
export default {
  name: 'root',
  components: { Players, Mobile, Modal },
  data () {
    return {
      team: 1,
      team1: '',
      team1Logo: null,
      team2: '',
      team2Logo: null,
      trading: false,
      directions: true,
      transitioning: true,
      bool: false,
      t1: t1,
      t2: t2,
      t3: t3,
      t4: t4,
      t5: t5
    }
  },
  mounted: utils.mounted,
  methods: {
    selectTeam: utils.selectTeam,
    renderTrade: utils.renderTrade,
    hideDirections: utils.hideDirections,
    initiate: utils.initiate,
    loop: utils.loop
  }
}
</script>

<style>

body {
  background-color: black;
}

.top {
  margin-top: 150px;
}

h1 {
  color: #fff;
  margin-bottom: 17px;
}

input {
  border: none;
  background-color: black;
  height: 30px;
  width: 350px;
  font-size: 24px;
  padding: none;
  color: #444444;
}
input:focus {
  outline: none;
}
::-webkit-input-placeholder {
  color: #444444;
  font-size: 24px;
}

ul {
  padding-left: 0px;
}
li {
  color: #fff;
  list-style: none;
}

li:hover {
  color: #33B17D;
  cursor: pointer;
}

.glyphicon {
  background-color: black;
  color: #fff;
  font-size: 20px;
  transition: 0.5s ease-out;
}
.glyphicon-arrow-right {
  font-size: 40px;
}
.glyphicon-arrow-right:hover {
  cursor: pointer;
  color: #33B17D;
  transform: rotate(360deg);
}

.glyphicon-random {
  margin-top: 5px;
  margin-right: 190px;
  font-size: 35px;
}

.glyphicon-random:hover {
  cursor: pointer;
  color: #33B17D;
}

.confirmed {
  color: #33B17D;
}
.glyphicon-ok {
  padding-left: 10px;
  font-size: 10px;
  display: inline;
  color: #33B17D;
}

li.checked:hover {
  color: #fff;
  cursor: default;
}

a {
  margin-left: 180px;
}
.block {
  margin-top: 300px;
}
.blocker {
  margin-top: 400px;
}
.block-pop {
  margin-top: 362px;
}
.block-arrow {
  margin-top: 350px;
}

@media only screen
and (min-device-width : 320px)
and (max-device-width : 480px){  .mobileHide { display: none;}}

.logos-name {
  padding-left: 3px;
}

.directions {
  margin-left: 16px;
  text-align: center;
  vertical-align: middle;
}

.space {
  margin-top: 225px;
}

h2 {
  color: #fff;
  text-align: center;
}

.panel-group {
  margin-left: 42px;
  width: 275px;
}
.how-to {
  color: white;
  background-color: black;
}

.how-to:hover {
  color: white;
  text-decoration: none;
  cursor: default;
}

.dir {
  transition: 1s ease-out;
  display: inline-block;
}
.dir:hover {
  transform: translateX(54px);
}
.dir-last:hover {
  transform: translateX(83px);
}

.btn-success {
  margin-top: 16px;
  text-align: center;
  width: 275px;
  background-color: black;
  border: 3px solid #33B17D;
}
.btn-success:hover {
  border: 2px solid #33B17D;
  background-color: #33B17D;
  color: black;
}
.glyphicon-thumbs-up {
  background-color: transparent;
  color: #33B17D;
}
.btn-success:hover .glyphicon-thumbs-up {
  color: black;
}

.btn-team {
  background-color: black;
  border: 3px solid #33B17D;
  width: 500px;
  height: 100px;
  color: #fff;
}
.btn-team:hover {
  background-color: #33B17D;
}

.well {
  margin-top: 20px;
  height: 210px;
  background-color: black;
  border: solid 1px #fff;
  padding-right: 0px;
  padding-left: 27px;
}

.col-sm-3 {
  padding-left: 0px;
  padding-right: 0px;
  width: 20%;
}

.fade-enter-active {
  transition: opacity 3s
}
.fade-enter {
  opacity: 0
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 5s
}
.modal-fade-enter, .modal-fade-leave-to {
  opacity: 0
}

#headingOne {
  background-color: black;
  border: 2px solid white;
  height: 46px;
}

.panel-title {
  color: white;
}

#collapseOne {
  border: 2px solid white;
  border-top: 0px solid white;
}

.panel>.panel-collapse>.list-group .list-group-item {
  border-width: 2px;
}
.title {
  transition: 1s ease-out;
}
.title:hover {
  transform: translateY(-10px);
}
</style>
