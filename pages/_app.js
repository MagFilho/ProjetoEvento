import FullLayout from "../src/layouts/FullLayout";
import Head from "next/head";
import "../src/styles/style.scss";
import {useEffect} from "react";
import ValidarLogin from "../src/Util/ValidarLogin";
import {useRouter} from "next/router";
import {AuthProvider} from "/src/Context/AuthContext";
import {parseCookies} from "nookies";
import Constantes from "../src/Constantes/Constantes";

function MyApp({ Component, pageProps }) {
  // process.env.TZ = "Europe/London";

  const router = useRouter();
  const { [Constantes.nome_token]: token } = parseCookies()

  useEffect(() => {
    if(!ValidarLogin.validarLogin()){
      router.push("/painel")
    }
  }, [])

  return (
      <>
        <Head>
          <title>{Constantes.nome_projeto}</title>
          <meta
              name="description"
              content=""
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AuthProvider>
          {!token ?
              <Component {...pageProps} />
              :
              <FullLayout>
                <Component {...pageProps} />
              </FullLayout>
          }
        </AuthProvider>

      </>
  );
}

export default MyApp;
