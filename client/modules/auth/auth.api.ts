import { ApiService } from '../../services/api.service';

export abstract class AuthApi extends ApiService {
  static async getHobbies() {
    return this.get('hobby');
  }

  static async getLanguages() {
    return this.get('language');
  }
}
