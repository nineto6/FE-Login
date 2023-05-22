import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Refresher() {
  const nav = useNavigate();

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: ``,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const interceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },

      async function (error) {
        const originalConfig = error.config;
        const msg = error.response.data.message;
        const status = error.resonse.status;

        if (status == 401) {
          if (msg == "accessToken expired") {
            await axios({
              url: ``,
              method: "post",
              headers: {
                accessToken: localStorage.getItem("token"),
                refreshToken: localStorage.getItem("refreshToken"),
              },
            })
              .then((res) => {
                localStorage.setItem("token", res.data.accessToken);

                originalConfig.headers["Authorization"] = res.data.accessToken;

                return refreshAPI(originalConfig);
              })
              .then((res) => {
                window.location.reload();
              });
          } else if (msg == "refresh token expired") {
            localStorage.clear();
            nav("/login");
            window.alert("로그인이 만료되어 자동으로 로그아웃 되었습니다.");
          } else if (msg == "mail token expired") {
            window.alert(
              "비밀번호 변경 시간이 만료되었습니다. 다시 요청해 주세요."
            );
          }
        } else if (status == 400 || status == 404 || status == 409) {
          window.alert(msg);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return <></>;
}
