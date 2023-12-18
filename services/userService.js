import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getUsers() {
    try {
        const users = userRepository.getAll();
        if (!users) {
            throw Error('Users are not found');
        }
        return users;
    } catch (error) {
        throw Error('Users are not found');
    }
}

  getUser(userData) {
      try {
          const currentUser = userRepository.getOne({id: userData});
          if (!currentUser) {
            throw Error('User is not found');
            }
            return currentUser;
        } catch (error) {
            throw Error('User is not found');
        }
  }

  create(userData) {
    if (userData) {
      return userRepository.create(userData); 
    } 
    throw Error('User is not saved');
  }

  update(id, userData) {
    if (userData) {
      const user = userRepository.update(id, userData);
      return user;
    }
    throw Error('User is not updated');
  }
  

  delete(id) {
    const item = userRepository.delete(id);
    if (!item.length) {
      throw Error ('There is no such a user to delete');
    }
    return "User is deleted";
};

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
