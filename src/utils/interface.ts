export enum QUERY_PARAMS {
  EMAIL_ID = "emailId",
  FILTER = "filter"
}

export enum FILTERS {
  UNREAD = "Unread",
  READ = "Read",
  FAVOURITE = "Favourite"
}

export interface EmailMetaData {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
}

export interface EmailList {
  list: EmailMetaData[];
  total: string;
}

export interface EmailBody {
  id: string;
  body: string;
}
