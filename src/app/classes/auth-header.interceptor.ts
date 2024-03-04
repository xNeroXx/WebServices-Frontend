import {HttpInterceptorFn} from '@angular/common/http';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("access_token");
  let refresh_token = localStorage.getItem("refresh_token");
  if (token && refresh_token) {
    if (req.url != 'http://127.0.0.1:8000/api/registration/auth/refresh') {
      let authed_req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authed_req);
    } else if (req.url == 'http://127.0.0.1:8000/api/registration/auth/refresh') {
      let refresh_req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${refresh_token}`
        }
      });
      return next(refresh_req);
    }
  }
  return next(req);
};
