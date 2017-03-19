import { autoserialize, deserializeAs, autoserializeAs } from 'cerialize';
import { inRange, trim } from 'lodash';

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

  get valid(): boolean {
    return inRange(trim(this.title).length, 10, 141)
      && inRange(trim(this.options[0]).length, 3, 141)
      && inRange(trim(this.options[1]).length, 3, 141);
  }

}
