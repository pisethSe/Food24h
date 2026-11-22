import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Food24h API';
  }

  getHealth() {
    return this.getHello();
  }
}
