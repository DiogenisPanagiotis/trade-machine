<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
          <h1 v-if="team === 1 || team === 2"> Team {{ team }} </h1>
          <h1 v-if="team === 0" class="confirmed"> Trading </h1>
          <ul v-if="team === 0">
            <li class="checked">{{team1}}<span class="glyphicon glyphicon-ok" aria-hidden="true"></span></li>
            <li class="checked">{{team2}}<span class="glyphicon glyphicon-ok" aria-hidden="true"></span></li>
          </ul>
          <input v-model="team1" v-if="team === 1" placeholder="Golden State Warriors" />
          <input v-model="team2" v-if="team === 2" placeholder="Cleveland Cavaliers" />
          <span v-if="team === 1 || team === 2" @click="clickArrow()" class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
          </br>
          </br>

          <transition-group
            v-if="team1 && bool1"
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
      </div>
    </div>

  </div>
</template>

<script>
import Teams from './teams.js';
export default {
  name: 'root',
  data () {
    return {
      team: 1,
      team1: '',
      team2: '',
      teams1: Teams,
      teams2: Teams,
      bool1: true,
      bool2: true
    }
  },
  computed: {
    team1Select: function(){
      let that = this;
      return this.teams1.filter((team) => {
        return team.teamName.toLowerCase().indexOf(that.team1.toLowerCase()) !== -1 && team.teamName !== that.team2;
      });
    },
    team2Select: function(){
      let that = this;
      return this.teams2.filter((team) => {
        return team.teamName.toLowerCase().indexOf(that.team2.toLowerCase()) !== -1 && team.teamName !== that.team1;
      });
    }
  },
  methods: {
    clickArrow: function(){
      if (this.team === 1) {
        this.team += 1;
      }
      if (this.team === 2) {
        this.focused = true;
      }
      if (this.team === 2 && this.team2){
        this.team = 0;
        console.log('Both teams selected!', this.team);
        this.msg = 'Let\'\s trade!';
      }
    },
    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter: function (el, done) {
      let delay = el.dataset.index;
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 1, height: '1.6em' },
          { complete: done }
        )
      }, delay);
    },
    leave: function (el, done) {
      let delay = el.dataset.index;
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    },
    teamCheck: function() {
      if (this.team1 !== '' && this.team2 !== '') {
        return true;
      }
      return false;
    },
    selectTeam(team, selection){
      this[team] = selection;
      console.log(this.team);
      if (this.team === 1){
        this.bool1 = !this.bool1;
      }
      if (this.team === 2) {
        this.bool2 = !this.bool2;
      }
    }
  }
}
</script>

<style>

body {
  background-color: black;
}

h1 {
  color: #fff;
  margin-top: 250px;
  margin-bottom: 17px;
}

input {
  border: none;
  background-color: black;
  height: 30px;
  width: 350px;
  font-size: 24px;
  padding: none;
}
input:focus {
  outline: none;
}
::-webkit-input-placeholder {
  color: #333333;
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
.glyphicon-arrow-right:hover {
  cursor: pointer;
  color: #33B17D;
  transform: rotate(360deg);
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

</style>
