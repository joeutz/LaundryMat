import * as bcrypt from 'bcrypt';
import { Entity, Unique, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import {  Matches, MaxLength, MinLength } from 'class-validator';

@Entity()
export class Users {
  @PrimaryKey()
  uuid: string = v4();

  @Property({ type: 'varchar' })
  @Unique()
  email: string;

  @Property({ type: 'varchar' })
  private password: string;

  @Property()
  private salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  static async Create(emailValue, passwordValue) {
    if (passwordValue.length < 6) throw new Error('Password too short.');
    if (passwordValue.length > 30) throw new Error('Password too long.');
    if (
      /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        passwordValue,
      ) == false
    )
      throw new Error(
        'At least 1 capital, 1 small, 1 special character & 1 number is required.',
      );

    const newUser = new Users();
    newUser.email = emailValue;
    const generatedSalt = await bcrypt.genSalt();
    newUser.salt = generatedSalt;
    newUser.password = await bcrypt.hash(passwordValue, generatedSalt);
    return newUser;
  }
}
