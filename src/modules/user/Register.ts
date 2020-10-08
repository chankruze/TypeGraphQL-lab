/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Oct 08 2020 06:19:23 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

// register resolver
@Resolver()
export class RegisterResolver {
  // @Querry(() => type, { config })
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPass = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    }).save();

    return user;
  }
}
