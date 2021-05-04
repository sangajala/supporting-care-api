import { Model } from 'mongoose';
import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssessmentFormService {
  constructor(
    @InjectModel('AssessmentForm')
    private readonly assessmentFormModel: Model<any>,
  ) {}

  async create(data: any, userId: any): Promise<any> {
    if (userId.userId == 'null') {
      return { status: 'no user found' };
    } else {
      const createdForm = new this.assessmentFormModel({
        userId: userId.userId,
        draft: data.draft,
        ...data,
      });

      return await createdForm.save();
    }
  }

  async findAll(userId, body): Promise<any> {
    if (userId.userId == 'null') {
      return { status: 'no user found' };
    } else {
      const where = {
        userId: userId.userId,
        draft: body,
      };
      return await this.assessmentFormModel.find(where).exec();
    }
  }
  async getformlist(userId): Promise<any> {
    const where = {
      userId: userId.userId,
    };
    return await this.assessmentFormModel.find(where).exec();
  }

  async draftform(): Promise<any> {
    const where = {
      draft: true,
    };
    return await this.assessmentFormModel.find(where).exec();
  }

  async submitedform(): Promise<any> {
    const where = {
      draft: false,
    };
    return await this.assessmentFormModel.find(where).exec();
  }

  async getAll(): Promise<any> {
    return await this.assessmentFormModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return await this.assessmentFormModel.findOne({ _id: id }).exec();
  }

  async edit(data: any): Promise<any> {
    const res = await this.assessmentFormModel
      .findOneAndUpdate({ _id: data.id }, { draft: false, ...data })
      .exec();
    if (res) {
      return { status: 'done' };
    }
  }

  async count(): Promise<any> {
    const draft = {
      draft: true,
    };
    const submit = {
      draft: false,
    };

    const submitted = await this.assessmentFormModel
      .find(submit)
      .count()
      .exec();
    const draftted = await this.assessmentFormModel
      .find()
      .count(draft)
      .exec();
    return {
      draft: draftted,
      submit: submitted,
    };
  }
}
