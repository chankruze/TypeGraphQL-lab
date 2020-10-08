/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Oct 08 2020 22:23:12 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAvailable } from "./isEmailAvailable";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  // custom validation(IsEmailAlreadyExist)
  @Field()
  @IsEmail()
  @IsEmailAvailable({ message: "email already in use" })
  email: string;

  @Field()
  password: string;
}
