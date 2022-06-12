import { Users } from './users.entity';

describe('User Entity', () => {
  let user: Users;
  const testEmail = 'test@test.com';
  const testPassword = 'Ab123456!';

  beforeAll(async () => {
    user = await Users.Create(testEmail, testPassword);
  });

  it('user email can be set in factory', () => {
    expect(user.email).toBe(testEmail);
  });
  it('user id is auto created and not null', () => {
    expect(user.uuid).not.toBeNull();
  });
  it('password validation fails if password does not match', () => {
    expect(user.validatePassword('NOT PASSWORD')).toBeFalsy;
    expect(user.validatePassword(testPassword)).toBeTruthy;
  });
  it('password must be between 6 and 30 characters', async () => {
    await expect(Users.Create('a@b.com', '')).rejects.toEqual(
      new Error('Password too short.'),
    );

    await expect(
      Users.Create('a@b.com', '123456789123456789abcdefghijklmnopqrA!'),
    ).rejects.toEqual(new Error('Password too long.'));

    await expect(Users.Create('a@b.com', '123456')).rejects.toEqual(
      new Error(
        'At least 1 capital, 1 small, 1 special character & 1 number is required.',
      ),
    );
  });
});
