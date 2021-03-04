import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { profile } from 'console';
import { Model } from 'mongoose';
import { UserInterface } from 'src/users/Models/interfaces/UserInterface';
import { User, UserDocument } from 'src/users/Models/schema/user.schema';


//Please Isolate Encryption to another Class
const bcrypt = require('bcrypt');



//User Services Create Read Update And Delete Users. Includes methods for Finding Users
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  //Create New User
  async newUser(user: UserInterface): Promise<any> {
    const findUser = this.usersModel.findOne({ email: user.email });

    if (!findUser) {
      try {

        const salt = await bcrypt.genSaltSync(10, 'b');
        user.password = await bcrypt.hashSync(user.password, salt);
        const newUser = await new this.usersModel(user);
        const saveduser = await newUser.save();
        return saveduser;

      } catch (error) {
        console.log(error);
        return 'error';
      }
    }
    return 'User is already signed up';
  }

  //Find User By User name
  async findOne(username: string): Promise<UserInterface | undefined> {
    return this.usersModel.findOne({ name: username });
  }
  //Find Or Create New User
  async findOrCreate(
    username: string,
    googleId: string,
    email: string,
  ): Promise<UserInterface | undefined> {
    const user = this.usersModel.findOne({ email });
    if (user) {
      return user;
    } else {
      const newuser = await this.newUser({
        name: username,
        email: email,
        password: '',
      });
      return newuser;
    }
    return undefined;
  }
}
