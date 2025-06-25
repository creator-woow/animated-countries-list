import { ZodIssueCode, infer, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export {
  z as validate,
  type infer as SchemaFields,
  zodResolver as formResolver,
  ZodIssueCode as IssueCode,
};

export interface ApiValidationError<
  TFields extends Record<string, string> = Record<string, string>,
> {
  message: string;
  fields: TFields;
}
