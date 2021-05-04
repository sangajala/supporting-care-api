import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async registration(@Body() body: any): Promise<any> {
    const result = await this.UserService.registration(body);
    return result;
  }

  @Post('/login')
  async login(@Body() body: any): Promise<any> {
    const result = await this.UserService.login(body.email, body.password);
    return result;
  }
  @Get('/')
  async me(@Req() request: Request): Promise<any> {
    const result = await this.UserService.me(request);
    return result;
  }
  @Get('/userlist')
  async userList(@Req() request: Request): Promise<any> {
    const userId: any = await this.UserService.me(request);
    const result = await this.UserService.userlist(userId);
    return result;
  }

  @Post('/active')
  async active(@Body() body: any, @Req() request: Request): Promise<any> {
    const userId: any = await this.UserService.me(request);
    const result = await this.UserService.activate(userId, body);
    return result;
  }
  @Post('/deactive')
  async deactive(@Body() body: any, @Req() request: Request): Promise<any> {
    const userId: any = await this.UserService.me(request);
    const result = await this.UserService.deactivate(userId, body);
    return result;
  }
  @Post('/delete')
  async delete(@Body() body: any, @Req() request: Request): Promise<any> {
    const userId: any = await this.UserService.me(request);
    const result = await this.UserService.delete(userId, body);
    return result;
  }
}
