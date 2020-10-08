import { Field, ID, ObjectType, Root } from "type-graphql";
/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Oct 08 2020 06:13:38 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password: string;
}
