'use client';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '../submit-button/SubmitButton';
import { getWalletBalanceWithFormDataAction } from './actions';
import { WalletBalance as TWalletBalance } from './schema';

export type WalletBalanceFormState = Partial<{
  message: string;
  error: string;
  data: TWalletBalance['result'] | null;
}>;

const initialState = {
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

  const handleFormSubmitAction = async (formData: FormData) => {
    if (!state.error) {
      await formAction(formData);

      // // reset the form
      // ref.current?.reset();
    }
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
              id="ticker"
              name="ticker"
              className="ticker-info__form-input"
              placeholder="Ticker i.e. TRIO"
              required
            />

            <p aria-live="polite" className="column" role="status">
              {state?.error}
            </p>
          </label>
          <label htmlFor="address">
            <input
              type="text"
              id="address"
              name="address"
              className="ticker-info__form-input"
              placeholder="Wallet Address"
              required
            />

            <p aria-live="polite" className="column" role="status">
              {state?.error}
            </p>
          </label>

          <SubmitButton />
        </form>

        {state.error && (
          <p className="wallet-balance__error">Error: {state.error}</p>
        )}
        {!state.error &&
          state.data &&
          state.data.map((wallet) => {
            return Object.entries(wallet).map(([k, v]) => (
              <>
                <p className="wallet-balance__data-point">
                  {k}: {v}
                </p>
              </>
            ));
          })}
      </section>
    </article>
  );
}
