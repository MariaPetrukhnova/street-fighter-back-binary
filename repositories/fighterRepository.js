import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }

  getOneByName(name) {
    const nameRegExp = new RegExp('^' + name + '$', 'i');
    return this.dbContext.find(fighter => nameRegExp.test(fighter.name)).value();
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
