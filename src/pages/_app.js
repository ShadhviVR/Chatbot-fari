import '@/styles/globals.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useRouter } from 'next/router';
import styles from '../styles/App.module.css';
import { InputTypeProvider } from '../../context/InputTypeContext';
import { OutputTypeProvider } from '../../context/OutputTypeContext';
import { GlobalInputProvider } from '../../context/GlobalInputContext';
import { PredictionProvider } from '../../context/PredictionContext';
import { VersionProvider } from '../../context/VersionContext';
import { LinkProvider } from '../../context/LinkContext';
import { useState, useEffect } from 'react';
import { fetchData, fetchGenerativeAi, fetchInterfaceComponent } from '../../api/axios';


function App({ Component, pageProps }) {


  const [nextPageHref, setNextPageHref] = useState('/');
  const [submitForm, setSubmitForm] = useState(false);
  const [languages, setLanguages] = useState('en');

  const handleSubmitForm = async (e) => {
    try {
      setSubmitForm(true);
    } catch (error) {
      console.log(error);
    }

  };

  const router = useRouter();

  const handleNextStep = () => {
    router.push(nextPageHref);
  };

  const resultPaths = ['/chat', '/pdf1', '/pdf2','/pdf3','/pdf4','/building','/headphone','/tortoise','/color'];
  const isResultPage = resultPaths.includes(router.pathname);
  

  useEffect(() => {
    if (router.query.languages) {
      setLanguages(router.query.languages);
      fetchData(router.query.languages);
      fetchGenerativeAi(router.query.languages);
      fetchInterfaceComponent(router.query.languages);
    }
  }, [router.query.languages]);

  return (
    <LinkProvider>
      <VersionProvider>
        <PredictionProvider>
          <GlobalInputProvider>
            <InputTypeProvider>
              <OutputTypeProvider>
                <div className={styles.pageContainer}>
                  
                  <Component
                    {...pageProps}
                    setNextPageHref={setNextPageHref}
                    submitForm={submitForm}
                    setSubmitForm={setSubmitForm}
                    languages={languages}

                  />
                  {isResultPage ? null : !submitForm && (
                    <Footer
                    setNextPageHref={setNextPageHref}
                    setSubmitForm={setSubmitForm}
                      handleNextStep={handleNextStep}
                      disabled={!nextPageHref}
                      onSubmit={handleSubmitForm}
                      languages={languages}
                    />
                  )}
                </div>
              </OutputTypeProvider>
            </InputTypeProvider>
          </GlobalInputProvider>
        </PredictionProvider>
      </VersionProvider>
    </LinkProvider>
  )
}

export default App;


