import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface';
import bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from 'src/users/enums/rolesEnum';
export type UserDocument = User & Document;


//User Schema Inplements UserInterface 
@Schema()
export class User implements UserInterface {
  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Prop()
  @IsNotEmpty()
  password: string;
  @Prop()
  @IsEmail()
  email: string;
  @Prop()
  @IsString()
  googleId: string;
  @Prop({ default: false })
  isAdmin: boolean;
  @Prop({default: UserRoles.customer})
  role:UserRoles[];
  
}



const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
