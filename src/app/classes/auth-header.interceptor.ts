import {HttpInterceptorFn} from '@angular/common/http';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("access_token");
  if (token) {
    let authed_req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authed_req);
  }
  return next(req);
};
