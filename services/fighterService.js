import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {

  getFighters() {
    try {
      const fighters = fighterRepository.getAll();
      if (!fighters) {
          throw Error('Fighters are not found');
      }
      return fighters;
    } catch (error) {
      throw Error('Fighters are not found');
    }
  }

  getOneFighter(fighterData) {
    try {
      const fighter = fighterRepository.getOne({id: fighterData});
      if (!fighter) {
        throw Error(`Fighter with id ${id} is not found`);
      }
      return fighter;
    } catch (error) {
      throw Error(`Fighter is not found`);
    }
  }  
  createFighter(fighterData) {
    try {
      if (fighterData) {
        return fighterRepository.create(fighterData);
      }

    } catch (error) {
      throw Error(`Fighter is not created`);
    }
  }

  updateFighter(id, fighterData) {
    if (fighterData) {
      const fighter = fighterRepository.update(id, fighterData);
      return fighter;
    }
    throw Error('Fighter is not updated');
  }

  deleteFighter(id) {
    const fighter = fighterRepository.delete({id});
    if (!fighter.length) {
      throw Error ('There is no such a fighter to delete');
    }
    return "Fighter is deleted";
  }

  searchFighter(query) {
    const fighter = fighterRepository.getOne(query);
    if (!fighter) {
      return '';
    }
    return fighter.name;
  }
  
}


const fighterService = new FighterService();

export { fighterService };
