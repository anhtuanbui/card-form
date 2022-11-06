import React, { Component } from 'react';
import front from './images/bg-card-front.png';
import back from './images/bg-card-back.png';
import cardLogo from './images/card-logo.svg';
import thankyou from './images/icon-complete.svg';
import './App.scss';


export class App extends Component {
  app = {
    values: {
      cardHolderName: '',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvc: ''
    },
    errors: {
      cardHolderName: '',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvc: ''
    },
    isSubmited: false,
  };
  constructor(props) {
    super(props);

    this.state = this.app;
  }

  cardNumber = (value) => {
    const cardNumber = value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    return cardNumber;
  }

  isValidNumber = (cardNumber) => {
    const regex = /^[0-9]*$/;
    const test = regex.test(cardNumber.split(' ').join(''));
    return test;
  }

  onNameChange = (e) => {
    const cardHolderName = e.target.value;
    const reg = /^[a-zA-Z ]+$/;

    if (reg.test(cardHolderName)) {
      this.app.values.cardHolderName = cardHolderName;
      this.app.errors.cardHolderName = '';
    } else {
      this.app.errors.cardHolderName = 'Invalid name';
    }
    this.setState(this.app);
  }

  onCardNumberChange = (e) => {
    const cardNumber = e.target.value;
    if (this.isValidNumber(cardNumber)) {
      this.app.values.cardNumber = this.cardNumber(cardNumber);
      this.app.errors.cardNumber = '';
    } else {
      this.app.errors.cardNumber = 'Wrong format, numbers only';
    }
    this.setState(this.app);
  }

  onMonthChange = (e) => {
    const expMonth = e.target.value;
    if (this.isValidNumber(expMonth)) {
      this.app.values.expMonth = expMonth;
      this.app.errors.expMonth = '';
    } else if (!this.isValidNumber(expMonth)) {
      this.app.errors.expMonth = 'Wrong format, numbers only';

    } else if (parseInt(expMonth) > 12) {
      this.app.errors.expMonth = 'Invalid month';
    }
    this.setState(this.app);
  }

  onYearChange = (e) => {
    const expYear = e.target.value;
    if (this.isValidNumber(expYear)) {
      this.app.values.expYear = expYear;
      this.app.errors.expYear = '';
    } else if (!this.isValidNumber(expYear)) {
      this.app.errors.expYear = 'Wrong format, numbers only';

    } else if (parseInt(expYear) > 12) {
      this.app.errors.expYear = 'Invalid month';
    }
    this.setState(this.app);
  }

  onCvcChange = (e) => {
    const cvc = e.target.value;
    if (this.isValidNumber(cvc)) {
      this.app.values.cvc = cvc;
      this.app.errors.cvc = '';
    } else if (!this.isValidNumber(cvc)) {
      this.app.errors.cvc = 'Wrong format, numbers only';
    }
    this.setState(this.app);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.values.cardHolderName === '') {
      this.app.errors.cardHolderName = "Can't be blank";
    }

    if (this.state.values.cardNumber === '') {
      this.app.errors.cardNumber = "Can't be blank";
    }

    if (this.state.values.expMonth === '') {
      this.app.errors.expMonth = "Can't be blank";
    }

    if (this.state.values.expYear === '') {
      this.app.errors.expYear = "Can't be blank";
    }

    if (this.state.values.cvc === '') {
      this.app.errors.cvc = "Can't be blank";
    }

    if (this.state.values.cardHolderName !== '' && this.state.values.cardNumber !== '' && this.state.values.expMonth !== '' && this.state.values.expYear !== '' && this.state.values.cvc !== '') {
      this.app.isSubmited = true;
    }

    this.setState(this.app)
  }

  onContinue = (e) => {
    e.preventDefault();
    this.app = {
      values: {
        cardHolderName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: ''
      },
      errors: {
        cardHolderName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: ''
      },
      isSubmited: false,
    };
    this.setState(this.app)
  }

  render() {
    return (
      <main>
        <div className="page">
          <div className="page-cards">
            <div className="page-cards__back">
              <p className='page-cards__back-cvc'>{this.state.values.cvc === '' ? "000" : this.state.values.cvc}</p>
              <img src={back} alt="card back" />
            </div>
            <div className="page-cards__front">
              <div className="page-cards__front-info">
                <div className="page-cards__front-info-logo">
                  <img src={cardLogo} alt="card logo" />
                </div>
                <p className='page-cards__front-info-number'>{this.state.values.cardNumber === '' ? "0000 0000 0000 0000" : this.cardNumber(this.state.values.cardNumber)}</p>
                <div className="page-cards__front-info-last-group">
                  <p className='page-cards__front-info-name'>{this.state.values.cardHolderName === '' ? 'JANE APPLESEED' : this.state.values.cardHolderName}</p>
                  <p className='page-cards__front-info-exp'>{this.state.values.expMonth === '' ? '00' : this.state.values.expMonth}/{this.state.values.expYear === '' ? '00' : this.state.values.expYear}</p>
                </div>
              </div>
              <img src={front} alt="card front" />
            </div>
          </div>
          <div className="page-form">
            {this.state.isSubmited ? <this.ThankYou /> : <this.Form />}
          </div>
        </div>
      </main >
    )
  }

  ThankYou = () => {
    return (
      <div className="thankyou">
        <img src={thankyou} alt="" aria-hidden='true' />
        <h1>THANK YOU!</h1>
        <p>We've added your card details</p>
        <input type="submit" value={"Continue"} onClick={this.onContinue} />
      </div>
    )
  }

  Form = () => {
    return (
      <form>
        <div className="page-form__wrapper">

          <div className="page-form__field">
            <label htmlFor="cardHolderName">CARDHOLDER NAME
              <br />
              <input id="cardHolderName" className={`page-form__field-input ${this.state.errors.cardHolderName ? 'page-form__field-input-error' : ''}`} onChange={this.onNameChange} type="text" name='cardHolderName' placeholder='e.g. Jane Appleseed' />
            </label>
            <p className="page-form__field-error">{this.state.errors.cardHolderName !== '' ? this.state.errors.cardHolderName : ""}</p>
          </div>

          <div className="page-form__field">
            <label htmlFor="cardNumber">CARD NUMBER
              <br />
              <input id="cardNumber" className={`page-form__field-input ${this.state.errors.cardNumber ? 'page-form__field-input-error' : ''}`} maxLength={19} onChange={this.onCardNumberChange} type="text" name='cardNumber' value={this.cardNumber(this.state.values.cardNumber)} placeholder='e.g. 1234 5678 9123 0000' />
            </label>
            <p className="page-form__field-error">{this.state.errors.cardNumber !== '' ? this.state.errors.cardNumber : ''}</p>
          </div>

          <div className="page-form__field-last-group">

            <div className="page-form__field">
              <label htmlFor="expDate">EXP. DATE (MM/YY)
                <br />
                <div className="page-form__field-time">

                  <input id="expDate" className={`page-form__field-time--first page-form__field-input ${this.state.errors.expMonth ? 'page-form__field-input-error' : ''}`} onChange={this.onMonthChange} type="text" placeholder='MM' name='expMonth' maxLength={2} max={31} />
                  <input type="text" className={`page-form__field-time--second page-form__field-input ${this.state.errors.expYear ? 'page-form__field-input-error' : ''}`} onChange={this.onYearChange} placeholder='YY' name='expYear' maxLength={2} />
                </div>
              </label>
              <p className="page-form__field-error">{this.state.errors.expMonth !== '' ? this.state.errors.expMonth : this.state.errors.expYear !== '' ? this.state.errors.expYear : ''}</p>
            </div>

            <div className="page-form__field page-form__field-cvc">
              <label htmlFor="cvc">CVC
                <br />
                <input id="cvc" className={`page-form__field-input ${this.state.errors.cvc ? 'page-form__field-input-error' : ''}`} type="text" name='cvc' onChange={this.onCvcChange} placeholder='e.g. 123' maxLength={3} />
              </label>
              <p className="page-form__field-error">{this.state.errors.cvc !== '' ? this.state.errors.cvc : ''}</p>
            </div>
          </div>
          <input className='page-form__field-submit' onClick={this.onSubmit} type="submit" value="Confirm" />

        </div>
      </form>
    )
  }
}


export default App;
