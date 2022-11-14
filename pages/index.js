import React from 'react';
import Head from 'next/head'


import homeStyles from '../styles/Home.module.css'
import formStyles from '../styles/Form.module.css'
import currency from 'currency.js';

//
const Home = () => {
  const [error, setError] = React.useState(null);
  const [output, setOutput] = React.useState(null);


  const calc = ({ salaryOne, salaryTwo, total }) => {
    const item = total.value;

    // individual wages
    const wage1 = salaryOne.value;
    const wage2 = salaryTwo.value;

    // Overall combined wage
    const combinedWage = wage1 + wage2

    // Percentage of the rent contributed
    const wage1Percentage = wage1 / combinedWage;
    const wage2Percentage = wage2 / combinedWage;

    // Actual amount paid
    const person1 = wage1Percentage * item;
    const person2 = wage2Percentage * item;

    return {
      personOne: currency(person1).value,
      personTwo: currency(person2).value
    }
  }

  const submit = async (e) => {
    e.preventDefault();

    setOutput(null);
    setError(null);

    const elementsArray = [...e.target.elements];
    const formData = elementsArray.reduce((acc, elem) => {
      if (elem.id) {
        acc[elem.id] = currency(elem.value);
      }

      return acc;
    }, {});

    const results = calc(formData);

    if (!isNaN(results.personOne) && !isNaN(results.personTwo)) {
      setOutput(results);
    }
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={homeStyles.main}>
        <h1 className={homeStyles.title}>
          How much should I pay?
        </h1>

        <p className={homeStyles.description}>
          Enter how much each person earns <br />and see how much each person should pay
        </p>

        <form className={homeStyles.grid} onSubmit={submit}>
          <div className={formStyles.formContainer}>
            <label name='salaryOne' className={formStyles.formLabel}>Salary One</label>
            <input min={0} step="any" id='salaryOne' className={formStyles.formInput} type='number' />
          </div>
          <div className={formStyles.formContainer}>
            <label name='salaryTwo' className={formStyles.formLabel}>Salary Two</label>
            <input min={0} step="any" id='salaryTwo' className={formStyles.formInput} type='number' />
          </div>
          <div className={formStyles.formContainer}>
            <label name='total' className={formStyles.formLabel}>Total Price</label>
            <input min={0} step="any" id='total' className={formStyles.formInput} type='number' />
          </div>

          <button type='submit' className={formStyles.formSubmit}>
            Calculate
          </button>
        </form>

        {output && (
          <footer className={homeStyles.footer}>
            <h3 className={homeStyles.result}>
              <small>👤</small>
              {output.personOne}
            </h3>
            <h3 className={homeStyles.result}>
              <small>👥</small>
              {output.personTwo}
            </h3>
          </footer>
        )}
      </main>
    </>
  )
}

export default Home;