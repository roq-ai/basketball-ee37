import { RefereeInterface } from 'interfaces/referee';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface GameInterface {
  id?: string;
  date_time: any;
  location: string;
  referee_id?: string;
  team1_id?: string;
  team2_id?: string;
  created_at?: any;
  updated_at?: any;

  referee?: RefereeInterface;
  team_game_team1_idToteam?: TeamInterface;
  team_game_team2_idToteam?: TeamInterface;
  _count?: {};
}

export interface GameGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  referee_id?: string;
  team1_id?: string;
  team2_id?: string;
}
