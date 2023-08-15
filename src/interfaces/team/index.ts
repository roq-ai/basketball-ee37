import { GameInterface } from 'interfaces/game';
import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  name: string;
  manager_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  game_game_team1_idToteam?: GameInterface[];
  game_game_team2_idToteam?: GameInterface[];
  player?: PlayerInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    game_game_team1_idToteam?: number;
    game_game_team2_idToteam?: number;
    player?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  manager_id?: string;
  organization_id?: string;
}
