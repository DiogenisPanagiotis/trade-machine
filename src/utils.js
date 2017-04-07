module.exports = {
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
    }, delay);
  },
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
  },
  dollarify: function(salary){
    let num = salary.toString().split('');
    let niceNum = [];
    let count = 0;
    for (var i = num.length - 1; i >= 0; i--) {
      if (count === 3) {
        niceNum.unshift(',');
        count = 0;
      }
      niceNum.unshift(num[i]);
      count++;
    }
    console.log(`$${niceNum.join('')}`);
    return `$${niceNum.join('')}`;
  },
  tradePlayer: function(player){
    if (player.teamName === this.team1 && this.disabled.indexOf(player.name) === -1) {
      this.team1Data.players.push(player);
      this.disabled.push(player.name);
      this.team1Data.trading += player.salary;
      this.team1Data.net += player.salary;
      this.team2Data.net -= player.salary;
    } else if (player.teamName === this.team2 && this.disabled.indexOf(player.name) === -1) {
      this.team2Data.players.push(player)
      this.disabled.push(player.name);
      this.team2Data.trading += player.salary;
      this.team2Data.net += player.salary;
      this.team1Data.net -= player.salary;
    }
  },
  undoTradePlayer: function(player, index) {
    console.log('Keeping:', player.name);
    if (player.teamName === this.team1) {
      this.team1Data.players.splice(index, 1); // Find and remove player from teamOneTrades and disabled
      let keeping = null;
      for (var i = 0; i < this.disabled.length; i++) {
        let currentPlayer = this.disabled[i];
        if (currentPlayer === player.name) {
          keeping = i;
        }
      }
      this.disabled.splice(keeping, 1);
      this.team1Data.trading -= player.salary;
      this.team1Data.net -= player.salary;
      this.team2Data.net += player.salary;
    } else if (player.teamName === this.team2) {
      this.team2Data.players.splice(index, 1);
      let keeping = null;
      for (var i = 0; i < this.disabled.length; i++) {
        let currentPlayer = this.disabled[i];
        if (currentPlayer === player.name) {
          keeping = i;
        }
      }
      this.disabled.splice(keeping, 1);
      this.team2Data.trading -= player.salary;
      this.team2Data.net -= player.salary;
      this.team1Data.net += player.salary;
    }
  },
  validateTrade: function() {
    let low = Math.min(this.team1Data.trading, this.team2Data.trading);
    let high = Math.max(this.team1Data.trading, this.team2Data.trading);
    console.log('high, low:', high, low);
    console.log("% Diff:", (high / low) * 100);
    if (low === 0 || high === 0) {
      this.valid = null;
    } else {
      low * 1.5 >= high ? this.valid = true : this.valid = false;
    }
  },
  completeTrade: function(){
    for (let i = 0; i < this.team1Data.players.length; i++) {
      let currentPlayer = this.team1Data.players[i];
      console.log(`Trading: ${currentPlayer}`);
      currentPlayer.teamName = this.team2;
      this.received.team1.push(currentPlayer);
      console.log(`${currentPlayer} now on ${this.team2}`);
    }
    this.team1Data.players = [];
    for (let i = 0; i < this.team2Data.players.length; i++) {
      let currentPlayer = this.team2Data.players[i];
      console.log(`Trading: ${currentPlayer}`);
      currentPlayer.teamName = this.team1;
      this.received.team1.push(currentPlayer);
      console.log(`${currentPlayer} now on ${this.team1}`);
    }
    this.team2Data.players = [];
    this.team1Data.trading = 0;
    this.received.team1Salary = this.team1Data.net;
    this.team1Data.net = 0;
    this.team2Data.trading = 0;
    this.received.team2Salary = this.team2Data.net;
    this.team2Data.net = 0;
    this.disabled = [];
    this.completed = true;
  }
};
