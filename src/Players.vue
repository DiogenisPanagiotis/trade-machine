<template>
  <div class="container">
    <!-- Team & Net -->
    <div class="row">
      <div class="col-xs-4 col-xs-offset-2">
        <ul class="list-group">
          <li class="list-group-item list-group-team">{{ team1 }}
            <span v-if="team1Data.net >= 0" class="team-badge badge pos">+{{ dollarify(team1Data.net) }}</span>
            <span v-if="team1Data.net < 0" class="team-badge badge neg">-{{ dollarify(team1Data.net) }}</span>
          </li>
        </ul>
      </div>
      <div class="col-xs-4">
        <ul class="list-group">
          <li class="list-group-item list-group-team">{{ team2 }}
            <span v-if="team2Data.net >= 0" class="team-badge badge pos">+{{ dollarify(team2Data.net) }}</span>
            <span v-if="team2Data.net < 0" class="team-badge badge neg">-{{ dollarify(team2Data.net) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- Traded players -->
    <div class="row">
      <div class="col-xs-4 col-xs-offset-2">
        <ul class="list-group">
          <li v-for="(player, index) in team2Data.players" class="list-group-item list-group-trading" @click="undoTradePlayer(player, index)">
            {{ player.name }} - {{ player.position }}
            <span class="badge">{{ dollarify(player.salary) }}</span>
          </li>
        </ul>
      </div>
      <div class="col-xs-4">
        <ul class="list-group">
          <li v-for="(player, index) in team1Data.players" class="list-group-item list-group-trading" @click="undoTradePlayer(player, index)">
            {{ player.name }} - {{ player.position }}
            <span class="badge">{{ dollarify(player.salary) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Origin players -->
    <div class="row">
      <div class="col-xs-4 col-xs-offset-2">
        <ul class="list-group">
          <li v-for="(player, index) in team1Players" class="list-group-item" @click='tradePlayer(player)'>
            {{ player.name }} - {{ player.position }}
            <span class="badge">{{ dollarify(player.salary) }}</span>
          </li>
        </ul>
      </div>
      <div class="col-xs-4">
        <ul class="list-group">
          <li v-for="(player, index) in team2Players" class="list-group-item" @click='tradePlayer(player)'>
            {{ player.name }} - {{ player.position }}
            <span class="badge">{{ dollarify(player.salary) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import players from './players.js';
import utils from './utils.js';
export default {
  name: 'players',
  props: [ 'team1', 'team2'],
  data(){
    return {
      players1: players,
      players2: players,
      team1Data: {
        players: [],
        net: 0,
        trading: 0
      },
      team2Data: {
        players: [],
        net: 0,
        trading: 0
      },
      disabled: []
    }
  },
  computed: {
    team1Players: function () {
      let that = this;
      return this.players1.filter((player) => {
        return player.teamName === that.team1;
      });
    },
    team2Players: function () {
      let that = this;
      return this.players2.filter((player) => {
        return player.teamName === that.team2;
      });
    }
  },
  methods: {
    dollarify: utils.dollarify,
    tradePlayer: utils.tradePlayer,
    undoTradePlayer: utils.undoTradePlayer
  }
}
</script>

<style scoped>

.container {
  margin-top: 150px;
}

.list-group-item {
  background-color: black;
}

.list-group-item:hover {
  background-color: black;
  /*color: #fff;*/
}
.team-badge {
  margin-top: 10px;
}
.badge {
  background-color: inherit;
}

.list-group-team {
  font-size: 21px;
  border: none;
}

.list-group-trading:hover {
  /*background-color: #2f1115;*/
  color: #EE3017;
}

.pos {
  color: #33B17D;
}

.neg {
  color: #EE3017;
}
</style>
