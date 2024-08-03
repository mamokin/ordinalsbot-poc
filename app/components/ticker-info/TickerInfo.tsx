'use client';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import KeyValue from '../key-value/KeyValue';
import { SubmitButton } from '../submit-button/SubmitButton';
import { getTickerInfoWithFormDataAction } from './actions';
import { TickerInfo as TTickerInfo } from './schema';
import './TickerInfo.css';

export type TickerInfoFormState = Partial<{
  message: string;
  error: string;
  data: TTickerInfo['result'] | null;
}>;

const initialState: TickerInfoFormState = {
  message: '',
  error: '',
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
    await formAction(formData);

    // reset the form
    ref.current?.reset();
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

            {state.error && (
              <p
                aria-live="polite"
                className="ticker-info__error error"
                role="status"
              >
                Error: {state.error}
              </p>
            )}
          </label>

          <SubmitButton key="ticker-info-submit" />
        </form>
      </section>

      <section>
        {!state.error && state.data && <KeyValue object={state.data} />}
      </section>
    </article>
  );
}
