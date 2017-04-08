import { autoserialize, autoserializeAs } from 'cerialize';

/** Representa um usuário da aplicação. */
export class User {

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
	 * Converte as chaves do formato do Auth0 para o nosso.
   *
	 * Exemplo:
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

  constructor(_key: string, auth0Id: string) {
    this._key = _key;
    this.auth0Id = auth0Id;
  }

  get _id() {
    return `user/${this._key}`;
  }

  get displayName(): string {
    return this.nickname || this.name;
  }

  toString() {
    return this.displayName;
  }

}
