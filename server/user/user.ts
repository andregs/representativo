import { autoserialize, autoserializeAs } from 'cerialize';

export default class User {

  @autoserialize readonly _key: string;
  @autoserialize readonly _rev: string;
  @autoserialize readonly auth0Id: string;

  @autoserialize email: string;
  @autoserialize emailVerified: boolean;
  @autoserialize name: string;
  @autoserialize nickname?: string;
  @autoserialize picture: string;
  @autoserialize admin: boolean;

  @autoserializeAs(Date) readonly createdAt: Date;
  @autoserializeAs(Date) readonly updatedAt: Date;

  constructor(_key: string) {
    this._key = _key;
  }

  get displayName(): string {
    return this.nickname || this.name;
  }

  toString() {
    return this.displayName;
  }

}
