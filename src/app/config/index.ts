import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  salt_round: process.env.SALT_ROUND,
  node_env: process.env.NODE_ENV,
  jwt_acess_secret : process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_acess_expieres:process.env.JWT_ACESS_EXPIERES_IN,
  jwt_referesh_expiers:process.env.JWT_REFERESH_EXPIERES_IN,
  reset_password_ui_link:process.env.RESET_PASSWORD_UI_LINK,
  cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET,
  cloudinary_cloud_name:process.env.CLOUD_NAME

};
