import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { AssessmentFormService } from './assessment-form.service';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Controller('assessment-form')
export class AssessmentFormController {
  constructor(
    private readonly AssessmentFormService: AssessmentFormService,
    private readonly UserService: UserService,
  ) {}
  @Get('/count')
  async count(): Promise<any> {
    const user = await this.UserService.count();
    const form =await this.AssessmentFormService.count();
    return {user, ...form };
  }
  @Post()
  async create(@Body() body: any, @Req() request: Request): Promise<any> {
    const userId: any = await this.UserService.me(request);
    const result = await this.AssessmentFormService.create(body, userId);
    return result;
  }

  @Get()
  async getAll(): Promise<any> {
    const result = this.AssessmentFormService.getAll();
    return result;
  }

  /**
   *
   * @param request particatular user draft+submitted form
   */
  @Get('/getformlist')
  async getuserform(@Req() request: Request): Promise<any> {
    const userId: any = await this.UserService.me(request);
    const result = this.AssessmentFormService.getformlist(userId);
    return result;
  }

  /**draft and submitted form */
  @Get('/get/:draft')
  async findAll(
    @Req() request: Request,
    @Param('draft') draft: string,
  ): Promise<any> {
    const userId: any = await this.UserService.me(request);
    const result = this.AssessmentFormService.findAll(userId, draft);
    return result;
  }

  /**
   * edit form
   */
  @Post('/edit')
  async edit(@Body() body: any): Promise<any> {
    const result = await this.AssessmentFormService.edit(body);
    return result;
  }
  /**
   * admin panel
   */
  @Get('/draft')
  async draft(): Promise<any> {
    const result = this.AssessmentFormService.draftform();
    return result;
  }
  @Get('/submit')
  async submit(): Promise<any> {
    const result = this.AssessmentFormService.submitedform();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const result = this.AssessmentFormService.findOne(id);
    return result;
  }
}
