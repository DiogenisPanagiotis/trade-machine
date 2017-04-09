<template>
  <div class="fake-body mobileHide">
    <div v-if="!trading" class="container">
      <div class="row">
        <div class="col-xs-2 col-xs-offset-1">
          <div class="block-pop"></div>
          <a v-if="team === 1 || team === 2" tabindex="0" id="pop" class="pop" role="button" data-toggle="popover" data-placement="left" data-trigger="focus" data-content="Select a team."></a>
        </div>
        <div class="col-xs-3">
          <div class="block"></div>
          <h1 v-if="team === 1 || team === 2"> Team {{ team }} </h1>
          <h1 v-if="team === 0" class="confirmed"> Trading </h1>
          <ul v-if="team === 0">
            <li class="checked">{{team1}}<span class="glyphicon glyphicon-ok" aria-hidden="true"></span></li>
            <li class="checked">{{team2}}<span class="glyphicon glyphicon-ok" aria-hidden="true"></span></li>
          </ul>
          <input v-model="team1" v-if="team === 1" placeholder="Golden State Warriors" autofocus/>
          <input v-model="team2" v-if="team === 2" placeholder="Cleveland Cavaliers" autofocus/>
          </br>
          </br>

          <transition-group
            v-if="team1 && !team2 && bool1"
            name="staggered-fade"
            tag="ul"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
          >
            <li
              v-for="(team, index) in team1Select"
              v-bind:key="team.teamName"
              v-bind:data-index="index"
              @click="selectTeam('team1', team.teamName)"
            >{{ team.teamName }}
            </li>
          </transition-group>

          <transition-group
            v-if="team2 && bool2"
            name="staggered-fade"
            tag="ul"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
          >
            <li
              v-for="(team, index) in team2Select"
              v-bind:key="team.teamName"
              v-bind:data-index="index"
              @click="selectTeam('team2', team.teamName)"
            >{{ team.teamName }}
            </li>
          </transition-group>
        </div>
        <div class="col-xs-3">
          <div class="block-arrow"></div>
          <span v-if="buttonBool && (team === 1 || team === 2)" @click="clickArrow()" class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
          <span v-if="team === 0" @click="renderTrade()"class="glyphicon glyphicon-random" aria-hidden="true"></span>
        </div>
      </div>
    </div>

    <Players v-if="trading" :team1="team1" :team2="team2"></Players>

  </div>
</template>

<script>
import Teams from './teams.js';
import Players from './Players.vue';
import utils from './utils.js';
export default {
  name: 'root',
  components: { Players },
  data () {
    return {
      team: 1,
      team1: '',
      team2: '',
      teams1: Teams,
      teams2: Teams,
      bool1: true,
      bool2: true,
      buttonBool: false,
      trading: false
    }
  },
  mounted: function(){
    $(function(){
      $('body').popover({ selector: '[data-toggle="popover"]' });
      $('#pop').popover('show');
    });
    setTimeout(()=>{
      $('#pop').popover('destroy');
    }, 3000);
  },
  computed: {
    team1Select: utils.team1Select,
    team2Select: utils.team2Select
  },
  methods: {
    clickArrow: utils.clickArrow,
    selectTeam: utils.selectTeam,
    renderTrade: utils.renderTrade,
    beforeEnter: utils.beforeEnter,
    enter: utils.enter,
    leave: utils.leave
  }
}
</script>

<style>

body {
  background-color: black;
}

h1 {
  color: #fff;
  /*margin-top: 300px;*/
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
  /*text-decoration: underline;*/
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
  text-decoration: underline;
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
  /*display: inline;*/
  /*float: right;*/
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
.col-xs-8 {
  /*border: 1px #fff solid;*/
}

.arrow {
  /*background-color: #333333;
  color: #333333;*/
}

.popover-content {
  /*background-color: #333333;*/
  color: #444444;
  /*border: none;*/
  font-weight: bold;
}
.popover-title {
  /*background-color: #333333;*/
}
.pop {
  width: 1px;
}
a {
  margin-left: 180px;
}
.block {
  margin-top: 300px;
}
.block-pop {
  margin-top: 362px;
}
.block-arrow {
  margin-top: 350px;
}
.mobileHide {
  display: none;
}
</style>
