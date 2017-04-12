module.exports = {
  mounted(){
    $(function(){
      $('body').popover({ selector: '[data-toggle="popover"]' });
      $('#pop').popover('show');
    });
    setTimeout(()=>{
      $('#pop').popover('destroy');
    }, 3000);
  },
  dollarify(salary){
    let num = salary.toString().split('');
    let niceNum = [];
    let count = 0;
    for (let i = num.length - 1; i >= 0; i--) {
      if (count === 3) {
        niceNum.unshift(',');
        count = 0;
      }
      niceNum.unshift(num[i]);
      count++;
    }
    return `$${niceNum.join('')}`;
  },
  tradePlayer(player){
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
  undoTradePlayer(player, index){
    console.log('Keeping:', player.name);
    if (player.teamName === this.team1) {
      this.team1Data.players.splice(index, 1); // Find and remove player from teamOneTrades and disabled
      let keeping = null;
      for (let i = 0; i < this.disabled.length; i++) {
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
      for (let i = 0; i < this.disabled.length; i++) {
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
  validateTrade(){
    let low = Math.min(this.team1Data.trading, this.team2Data.trading);
    let high = Math.max(this.team1Data.trading, this.team2Data.trading);
    if (low === 0 || high === 0) {
      this.valid = null;
    } else {
      low * 1.5 >= high ? this.valid = true : this.valid = false;
    }
  },
  completeTrade(){
    for (let i = 0; i < this.team1Data.players.length; i++) {
      let currentPlayer = this.team1Data.players[i];
      currentPlayer.teamName = this.team2;
      this.received.team2.push(currentPlayer);
    }
    this.team1Data.players = [];
    for (let i = 0; i < this.team2Data.players.length; i++) {
      let currentPlayer = this.team2Data.players[i];
      currentPlayer.teamName = this.team1;
      this.received.team1.push(currentPlayer);
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
    $('#myModal').modal('show');
  },
  resetTrade(){
    this.received = {
      'team1': [],
      'team1Salary': 0,
      'team2': [],
      'team2Salary': 0
    }
  },
  selectTeam(team, selection){
    if (this.team === 1){
      this.team1 = selection;
      this.team1Logo = team.logo;
      this.team++;
      this.transitioning = !this.transitioning;
      setTimeout(()=> {
        this.transitioning = !this.transitioning;
      }, 1);
      this.loop(this.t1, selection);
      this.loop(this.t2, selection);
      this.loop(this.t3, selection);
      this.loop(this.t4, selection);
      this.loop(this.t5, selection);
    } else {
      this.team2 = selection;
      this.team2Logo = team.logo;
      $('#myModalTrade').modal('show');
      this.trading = !this.trading;
      this.transitioning = !this.transitioning;
      this.team = 0;
    }
  },
  loop(teamArr, team1){
    for (let i = 0; i < teamArr.length; i++) {
      let obj = teamArr[i];
      if (team1 === obj.teamName){
        this.spliced = [teamArr, obj, i];
        teamArr.splice(i, 1);
      }
    }
  },
  renderTrade(){
    this.trading = !this.trading;
  },
  hideDirections(){
    this.directions = !this.directions;
  },
  initiate(){
    setTimeout(() => {
      this.bool = true;
    }, 10);
  },
  team1Players(){
    let that = this;
    return this.players1.filter((player) => {
      return player.teamName === that.team1;
    });
  },
  team2Players(){
    let that = this;
    return this.players2.filter((player) => {
      return player.teamName === that.team2;
    });
  },
  reSelectTeams(){
    let teamObj = this.spliced[0];
    let i = this.spliced[2];
    let obj = this.spliced[1];
    teamObj.splice(i, 0, obj);
    this.transitioning = true;
    this.team = 1;
    this.trading = false;
    this.directions = true;
    this.bool = true;
  },
  renderFormSpree(){
    $('#formFeedback').modal('show');
  }
};
