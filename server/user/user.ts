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

  /**
	 * Maps Auth0 keys to our format.
	 * Usage:
	 * ```
	 * DeserializeKeysFrom(User.keyTransformer); // enable
	 * const user: User = Deserialize(auth0Json, User);
	 * DeserializeKeysFrom(null); // disable
	 * ```
	 */
  static keyTransformer(key: string): string {
    switch (key) {
      case '_key': return 'username';
      case 'auth0Id': return 'user_id';
      case 'emailVerified': return 'email_verified';
      case 'createdAt': return 'created_at';
      case 'updatedAt': return 'updated_at';
      default: return key;
    }
  }

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
