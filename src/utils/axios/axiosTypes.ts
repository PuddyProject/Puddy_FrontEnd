interface BaseHttpMethod {
  endpoint: string;
  params?: string;
  queryString?: string;
}

export interface GET extends BaseHttpMethod {}

export interface DELETE extends BaseHttpMethod {}

export interface POST extends BaseHttpMethod {
  body?: object;
  isImage?: boolean;
  isPost?: boolean;
}

export interface PATCH extends BaseHttpMethod {
  body?: object | File;
  isFormData: boolean;
}

export interface PUT extends BaseHttpMethod {
  body?: object | File;
  isFormData: boolean;
}
