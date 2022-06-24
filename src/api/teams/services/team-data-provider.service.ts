import { Injectable } from "@nestjs/common";
import { faker } from "@faker-js/faker";
import TeamConfig from "../../../config/constants/teamConfig";
import { GeneratedTeamData } from "../interfaces/generated-team-data.interface";
import { GeneratedPlayerData } from "../interfaces/generated-player-data.interface";

@Injectable()
export class TeamDataProviderService {

  public generateTeamData(): GeneratedTeamData {
    return {
      name: TeamDataProviderService.generateTeamName(),
      country: TeamDataProviderService.generateTeamCountry(),
      budget: TeamDataProviderService.getTeamDefaultBudget(),
    };
  }

  public generatePlayerData(): GeneratedPlayerData {
    return {
      firstName: TeamDataProviderService.generatePlayerFirstName(),
      lastName: TeamDataProviderService.generatePlayerLastName(),
      country: TeamDataProviderService.generatePlayerCountry(),
      age: TeamDataProviderService.generatePlayerAge(),
      marketValue: TeamDataProviderService.getPlayerDefaultMarketValue(),
    };
  }

  private static generatePlayerFirstName = () => faker.name.firstName();
  private static generatePlayerLastName = () => faker.name.lastName();
  private static generatePlayerAge = () => faker.datatype.number({ min: 18, max: 40 });
  private static generatePlayerCountry = () => faker.address.countryCode('alpha-2');
  private static getPlayerDefaultMarketValue = () => TeamConfig.getPlayerDefaultMarketValue();

  private static generateTeamName = () => faker.company.companyName();
  private static generateTeamCountry = () => faker.address.countryCode('alpha-2');
  private static getTeamDefaultBudget = () => TeamConfig.getTeamDefaultBudget();
}

export default TeamDataProviderService;