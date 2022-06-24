export class TeamConfig {

  static goalkeepers: number = 3;
  static defenders: number = 6;
  static midfielders: number = 6;
  static attackers: number = 5;

  static getPlayerDefaultMarketValue = (): number => 1_000_000;
  static getTeamDefaultBudget = (): number => 5_000_000;

  static getPositions() {
    return [
      'goalkeeper',
      'defender',
      'midfielder',
      'attacker',
    ];
  }

  static getPlayersPerPosition() {
    return {
      'goalkeeper': this.goalkeepers,
      'defender': this.defenders,
      'midfielder': this.midfielders,
      'attacker': this.attackers,
    };
  }
}

export default TeamConfig;