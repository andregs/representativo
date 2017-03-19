import { autoserialize, deserializeAs, autoserializeAs } from 'cerialize';
import User from '../user/user';

/** Representa uma pergunta. */
export default class Question {

  @autoserialize readonly _key: string;
  @autoserialize readonly _rev: string;

  @autoserialize title: string;
  @autoserializeAs(String) readonly options = ['', ''];
  @deserializeAs(User) questioner: User;

  @deserializeAs(Date) readonly createdAt: Date;
  @deserializeAs(Date) readonly updatedAt: Date;

  get _id() {
    return `question/${this._key}`;
  }

  toString() {
    return this.title;
  }

}
