export interface GET {
  endpoint: string;
  params?: string;
  queryString?: string;
}

export interface DELETE {
  endpoint: string;
  params?: string;
  queryString?: string;
}

export interface POST {
  endpoint: string;
  body?: object;
  isImage?: boolean;
  isPost?: boolean;
}

export interface PATCH {
  endpoint: string;
  body?: object | File;
  isFormData: boolean;
}

export interface PUT {
  endpoint: string;
  body?: object | File;
  isFormData: boolean;
}
