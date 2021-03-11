import React, { Component, Suspense, useState } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import './App.css';

// use hoc for class based components
class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props;
    return <h1>{t('title')}</h1>;
  }
}
const Welcome = withTranslation()(LegacyWelcomeClass);

// Component using the Trans component
function MyComponent() {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  );
}

const MyPluralComponent = ({score,add,reset}) =>{
  return(
    <div>
      <h2>
        <Trans i18nKey="newMessages" count={score}>
          You got {{ count: score}} messages.
        </Trans>
      </h2>
      <button type="button" onClick={()=>add()}>
        +
      </button>
      <button type="button" onClick={()=>reset()}>
        Reset
      </button>
    </div>
  )
}

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation();
  const [score,setScore] = useState(0)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const add = () => {
    setScore(score+1)
  }


  const reset = () => {
    setScore(0)
  }

  return (
    <div className="App">
      <div className="App-header">
        <Welcome />
        <button type="button" onClick={() => changeLanguage('pl')}>
          pl
        </button>
        <button type="button" onClick={() => changeLanguage('en')}>
          en
        </button>
      </div>
      <div className="App-intro">
        <MyComponent />
      </div>
      <div>{t('description.part2')}</div>
      <MyPluralComponent score={score} add={add} reset={reset}/>
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}