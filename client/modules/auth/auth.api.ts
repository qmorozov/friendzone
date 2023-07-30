import { ApiService } from '../../services/api.service';

export abstract class AuthApi extends ApiService {
  static async getHobbies() {
    return this.get('hobby');
  }

  static async getLanguages() {
    return this.get('language');
  }

  static async createUser(userData: any) {
    return this.post('auth/register', userData);
  }

  static async editUser(userData: any, token: string) {
    return this.putWithToken('user/update', userData, token);
  }

  static async checkUserName(username: string) {
    return this.get(`user/checkUsername/${username}`);
  }
}
