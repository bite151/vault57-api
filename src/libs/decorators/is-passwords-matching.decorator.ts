import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegisterDto } from '../../auth/dto/register.dto';

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatching implements ValidatorConstraintInterface {
  public validate(passwordConfirm: string, args: ValidationArguments): boolean {
    const obj = args.object as RegisterDto;
    return obj.password === passwordConfirm;
  }

  public defaultMessage(): string {
    return "The passwords don't match";
  }
}
