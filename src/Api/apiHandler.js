import axois from 'axios'
const baseURL = "http://192.168.0.104:81/api/"
export const apiHandler = (token = false ) => {
    const instance =axois.create({
        baseURL: baseURL,
        headers: {
          'Content-Type': 'multipart/form-data',
            Authorization: token ? `Bearer ${token}` : null,
            ...axois.defaults.headers,
        }
    })
    instance.interceptors.request.use(
      (config) => {
        config.headers.Accept=''
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error)
        return Promise.reject(error);
      }
    );
    return instance
}

