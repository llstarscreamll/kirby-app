import { BaseAuthService } from "./abstract-auth.service";

class ConcreteClass extends BaseAuthService {

}

describe('BaseAuthService', () => {
  let concreteClass: ConcreteClass;

  beforeEach(function () {
    concreteClass = new ConcreteClass;
  });

  it('should return auth headers', () => {
    const testToken = { access_token: 'foo' };
    expect(concreteClass.authHeaders(testToken)).toBeTruthy();
  });
});
