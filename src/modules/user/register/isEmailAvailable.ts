/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Oct 08 2020 22:58:32 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { User } from "../../../entity/User";

@ValidatorConstraint({ async: true })
export class IsEmailAvailableConstraint
  implements ValidatorConstraintInterface {
  validate(email: string) {
    // find user with email
    return User.findOne({ where: { email } }).then((user) => {
      if (user) return false; // invalidate
      return true; // validate
    });
  }
}

export function IsEmailAvailable(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAvailableConstraint,
    });
  };
}
