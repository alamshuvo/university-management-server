export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: {
    type: Boolean;
    default: true;
  };
  role: {
    type: String;
    enum: ['admin' | 'student' | 'faculty'];
  };
  isDeleted: {
    type: Boolean;
    default: false;
  };
  status: {
    type: String;
    enum: ['in-progress' | 'blocked'];
    default: 'in-progress';
  };
};

export type TNewUser = {
  role: string;
  password: string;
  id:string
};
