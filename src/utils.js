module.exports = {
  beforeEnter(el) {
    el.style.opacity = 0;
    el.style.height = 0;
  },
  enter(el, done) {
    let delay = el.dataset.index;
    setTimeout(function() {
      Velocity(
        el,
        { opacity: 1, height: '1.6em' },
        { complete: done }
      )
    }, delay);
  },
  leave(el, done) {
    let delay = el.dataset.index;
    setTimeout(function () {
      Velocity(
        el,
        { opacity: 0, height: 0 },
        { complete: done }
      )
    }, delay);
  },
  team1Select(){
    let that = this;
    return this.teams1.filter((team) => {
      return team.teamName.toLowerCase().indexOf(that.team1.toLowerCase()) !== -1 && team.teamName !== that.team2;
    });
  },
  team2Select(){
    let that = this;
    return this.teams2.filter((team) => {
      return team.teamName.toLowerCase().indexOf(that.team2.toLowerCase()) !== -1 && team.teamName !== that.team1;
    });
  },
  dollarify(salary){
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
  validateTrade(){
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
  completeTrade(){
    for (let i = 0; i < this.team1Data.players.length; i++) {
      let currentPlayer = this.team1Data.players[i];
      console.log(`Trading: ${currentPlayer}`);
      currentPlayer.teamName = this.team2;
      this.received.team2.push(currentPlayer);
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
  clickArrow(){
    if (this.team === 1) {
      this.team += 1;
      this.bool1 = !this.bool1;
      this.buttonBool = !this.buttonBool;
      $('#pop').popover('show');
      setTimeout(()=>{
        $('#pop').popover('destroy');
      }, 3000);
    } else {
      this.bool2 = !this.bool2;
    }
    if (this.team2){
      this.team = 0;
    }
  },
  selectTeam(team, selection){
    if (this.team === 1){
      this.team1 = selection;
      this.team1Logo = team.logo;
      this.team++;
      for (let i = 0; i < this.t1.length; i++){
        let ele = this.t1[i];
        if (this.team1 === ele.teamName){
          this.t1.splice(i, 1);
        }
      }
      for (let i = 0; i < this.t2.length; i++){
        let ele = this.t2[i];
        if (this.team1 === ele.teamName){
          this.t2.splice(i, 1);
        }
      }
      for (let i = 0; i < this.t3.length; i++){
        let ele = this.t3[i];
        if (this.team1 === ele.teamName){
          this.t3.splice(i, 1);
        }
      }
      for (let i = 0; i < this.t4.length; i++){
        let ele = this.t4[i];
        if (this.team1 === ele.teamName){
          this.t4.splice(i, 1);
        }
      }
      for (let i = 0; i < this.t5.length; i++){
        let ele = this.t5[i];
        if (this.team1 === ele.teamName){
          this.t5.splice(i, 1);
        }
      }
    } else {
      this.team2 = selection;
      this.team2Logo = team.logo;
      $('#myModalTrade').modal('show');
      console.log(this.team1Logo);
      console.log(this.team1, this.team2);
      console.log(this.team2Logo);
      this.trading = !this.trading;
      this.team = 0;
    }
    this.buttonBool = true;
  },
  renderTrade(){
    this.trading = !this.trading;
  }
};
