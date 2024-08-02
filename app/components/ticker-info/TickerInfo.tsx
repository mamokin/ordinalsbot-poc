'use client';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import KeyValue from '../key-value/KeyValue';
import { SubmitButton } from '../submit-button/SubmitButton';
import { getTickerInfoWithFormDataAction } from './actions';
import { TickerInfo as TTickerInfo } from './schema';

export type TickerInfoFormState = Partial<{
  message: string;
  error: string;
  data: TTickerInfo['result'] | null;
}>;

const initialState = {
  error: '',
  message: '',
  data: null
};

export default function TickerInfo() {
  const ref = useRef<HTMLFormElement>(null);

  // TODO: https://github.com/vercel/next.js/issues/65673#issuecomment-2112746191
  // const [state, formAction] = useActionState(createSubmissionAction, initialState)
  const [state, formAction] = useFormState(
    getTickerInfoWithFormDataAction,
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
    <article>
      <h3>Ticker Info</h3>

      <section>
        <form
          ref={ref}
          action={handleFormSubmitAction}
          className="ticker-info__form"
        >
          <label htmlFor="ticker">
            <input
              type="text"
              id="ticker-info__ticker"
              name="ticker"
              className="ticker-info__form-input"
              placeholder="Ticker i.e. TRIO"
              required
            />

            <p aria-live="polite" className="column" role="status">
              {state?.error}
            </p>
          </label>

          <SubmitButton />
        </form>
      </section>

      <section>
        {state.error && (
          <p className="ticker-info__error">something went wrong</p>
        )}
        {!state.error && state.data && <KeyValue object={state.data} />}
      </section>
    </article>
  );
}
