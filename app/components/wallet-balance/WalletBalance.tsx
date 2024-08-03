'use client';
import { Suspense, useRef } from 'react';
import { useFormState } from 'react-dom';
import ErrorMesage from '../error-message/ErrorMessage';
import KeyValue from '../key-value/KeyValue';
import Loader from '../loader/Loader';
import { SubmitButton } from '../submit-button/SubmitButton';
import { getWalletBalanceWithFormDataAction } from './actions';
import { WalletBalance as TWalletBalance } from './schema';
import './WalletBalance.css';

export type WalletBalanceFormState = Partial<{
  message: string;
  error: string;
  data: TWalletBalance['result'] | null;
}>;

const initialState: WalletBalanceFormState = {
  error: '',
  message: '',
  data: null
};

/**
 * server component
 *
 * This component fetches the following for BRC20 token:
 *
 *  - available balance
 *  - transferrable balance
 *
 * Read more: https://docs.ordinalsbot.com/brc20-api/opi-api
 */
export default function WalletBalance() {
  const ref = useRef<HTMLFormElement>(null);

  // TODO: https://github.com/vercel/next.js/issues/65673#issuecomment-2112746191
  // const [state, formAction] = useActionState(createSubmissionAction, initialState)
  const [state, formAction] = useFormState(
    getWalletBalanceWithFormDataAction,
    initialState
  );

  const handleFormSubmitAction = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <article className="wallet-balance__container">
      <h3>Wallet Balance</h3>

      <section>
        <form
          ref={ref}
          action={handleFormSubmitAction}
          className="ticker-info__form"
        >
          <label htmlFor="ticker">
            <input
              type="text"
              id="wallet-balance__ticker"
              name="ticker"
              className="ticker-info__form-input"
              placeholder="Ticker i.e. TRIO"
            />
          </label>
          <br />
          <label htmlFor="address">
            <input
              type="text"
              id="wallet-balance__address"
              name="address"
              className="ticker-info__form-input"
              placeholder="Wallet Address"
              required
            />
          </label>

          {state.error && <ErrorMesage error={state.error} />}

          <br />

          <SubmitButton key="wallet-balance-submit" />
        </form>

        <Suspense fallback={<Loader />}>
          {!state.error &&
            state.data?.map((wallet) => {
              return (
                <KeyValue key={wallet.available_balance} object={wallet} />
              );
            })}
        </Suspense>
      </section>
    </article>
  );
}
