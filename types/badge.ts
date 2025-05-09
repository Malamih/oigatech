type RegisterResponse = {
  message: string;
  payload: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    position: string;
    company_name: string;
    participation_type: string;
    send_via: string;
    image: string;
    qrcode: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

type BadgeConditionRes = {
  message: string;
  condition: string;
};
