import { autoserialize, autoserializeAs, deserializeAs } from 'cerialize';
import { inRange, pick, trim } from 'lodash';
import Question from './question';

/** Representa a resposta de uma pergunta. */
export default class Answer {

  @autoserialize readonly _key: string;
  @autoserialize readonly _rev: string;

  @autoserializeAs(Question) question: Question;
  @autoserialize chosen: 0 | 1;
  @autoserialize opinion: string;

  @deserializeAs(Date) readonly createdAt: Date;
  @deserializeAs(Date) readonly updatedAt: Date;

  /** Ao serializar a pergunta, mantemos só sua referência. */
  public static OnSerialized(instance: Answer, json: any) {
    json.question = pick(instance.question, '_key', '_rev');
  }

  get _id() {
    return `answer/${this._key}`;
  }

  get valid(): boolean {
    return (this.chosen === 0 || this.chosen === 1)
      && inRange(trim(this.opinion).length, 0, 401);
  }

}
