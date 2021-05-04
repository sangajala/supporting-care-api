import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AssessmentFormController } from './assessment-form.controller';
import { AssessmentFormSchema } from './schemas/assessment-form.schema';
import { AssessmentFormService } from './assessment-form.service';
import { UserController } from 'src/user/user.controller';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AssessmentForm', schema: AssessmentFormSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [AssessmentFormController, UserController],
  providers: [AssessmentFormService, UserService],
})
export class AssessmentFormModule {}
