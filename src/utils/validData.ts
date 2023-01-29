import { ILoginUser, IRegisterUser } from "./TypeScript"
export const checkDataLogin = (data: ILoginUser) => {
   const errors: string[] = []
   if(!data.email) errors.push('Please add your email or phone number.')
   if(!data.password) errors.push('Please add your password.')
   return {
      errors,
      errLength: errors.length
   }
}

export const checkDataRegister = (data: IRegisterUser) => {
   const errors: string[] = []
   if(!data.fullname) errors.push('Please add your full name.')
   if(!data.username) errors.push('Please add your user name.')
   if(!data.email) errors.push('Please add your email or phone number.')
   if(!data.password) errors.push('Please add your password.')
   if(!data.cf_password) errors.push('Please confirm your password.')
   if(data.password !== data.cf_password) errors.push('Confirm password did not match.')
   if(!data.gender) errors.push('Please add your gender');
   return {
      errors,
      errLength: errors.length
   }
}

export function isImage(url: string) {
   return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}