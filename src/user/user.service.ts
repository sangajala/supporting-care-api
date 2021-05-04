import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { generateHash, compareHash } from '../common/encryption';
import { JWTRepository } from 'src/common/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<any>) {}

  async registration(body: any) {
    const result = await this.UserModel.findOne({ email: body.email }).exec();
    if (result) {
      return { status: 'fail', result: 'emailexist' };
    } else {
      const register = new this.UserModel({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        password: generateHash(body.password),
      });

      return await register.save();
    }
  }

  async login(email: string, password: string) {
    const result = await this.UserModel.findOne({ email: email }).exec();
    if (!result) {
      return { status: 'fail', result: 'email not found', token: null };
    }

    if (result.active == 'false') {
      return { status: 'fail', result: 'deactive', token: null };
    }
    if (compareHash(result.password, password)) {
      const token = `Bearer ${JWTRepository.getInstance().generateToken(
        `${result._id}`,
      )}`;
      return {
        status: 'sucess',
        message: 'login successfully!',
        token,
      };
    } else {
      return { status: 'fail', message: 'Invalid password' };
    }
  }

  async me(req: any) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return { userId: 'null' };
    }
    const token = authorization.replace('Bearer ', '');
    const { userId } = await JWTRepository.getInstance().verfyToken(token);
    return { userId };
  }

  async userlist(userId) {
    if (userId.userId == 'null') {
      return { status: 'no user found' };
    } else {
      const result = await this.UserModel.find().exec();
      return result;
    }
  }
  async activate(userId: any, body: any) {
    if (userId.userId == 'null') {
      return { status: 'no user found' };
    } else {
      const result = await this.UserModel.findOneAndUpdate(
        { _id: body.userId },
        {
          active: 'true',
        },
      ).exec();
      if (result) {
        return { status: 'activated success' };
      }
    }
  }
  async deactivate(userId: any, body: any) {
    if (userId.userId == 'null') {
      return { status: 'no user found' };
    } else {
      const result = await this.UserModel.findOneAndUpdate(
        { _id: body.userId },
        {
          active: 'false',
        },
      ).exec();
      if (result) {
        return { status: 'deactivated success' };
      }
    }
  }
  async delete(userId: any, body: any) {
    if (userId.userId == 'null') {
      return { status: 'no user found' };
    } else {
      const result = await this.UserModel.findOneAndDelete({
        _id: body.userId,
      }).exec();
      if (result) {
        return { status: 'delete success' };
      }
    }
  }

  async userData(userId: any) {
    const result = await this.UserModel.find({
      _id: userId,
    }).exec();
    if (result) {
      return result;
    }
  }
  async count() {
    const user = await this.UserModel.find().count().exec();
    if (user) {
      return user;
    }
  }
}
