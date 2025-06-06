// app/other-contact/types.ts
export type ContactState = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  fields: {
    name: string;
    email: string;
    message: string;
  };
};
