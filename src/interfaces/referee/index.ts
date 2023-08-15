import { GameInterface } from 'interfaces/game';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface RefereeInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  game?: GameInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    game?: number;
  };
}

export interface RefereeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
