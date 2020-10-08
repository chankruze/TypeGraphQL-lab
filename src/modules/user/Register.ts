/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Oct 08 2020 06:19:23 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";

// register resolver
@Resolver(User)
export class RegisterResolver {
  // @Querry(() => type, { config })
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
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
