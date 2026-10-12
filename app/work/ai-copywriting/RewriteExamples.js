import styles from './RewriteExamples.module.css';

// Eight cleared tracker entries, grouped into seven comparisons. These exact
// texts are historical evidence; the guidance describes alignment with v7.
const examples = [
  {
    id: 'email',
    label: 'Email error recovery',
    component: 'Error Message',
    context: 'The email address is already registered.',
    before: 'Email already registered! Try again',
    after: 'This email is already registered. Try a different one.',
    reason: 'Explain the issue and give a next step that can resolve it.',
    rule: 'State the problem and give an action that helps the person recover.',
    principle: 'Write Helpful Error Messages and Failure scenarios',
    type: 'error',
  },
  {
    id: 'pan',
    label: 'PAN verification',
    component: 'Step Indicator',
    context: 'The instruction changes with the state of the PAN field.',
    before: 'Step 2 of 5: Verify PAN',
    after: 'Step 2 of 5: Enter PAN',
    filled: 'Step 2 of 5: Confirm PAN',
    reason: 'Match the instruction to the screen state: enter missing information or confirm existing information.',
    rule: 'Use the action the person can take on this screen.',
    principle: 'Provide Context and Helpful Guidance',
    type: 'step',
  },
  {
    id: 'camera',
    label: 'Camera action',
    component: 'Primary Button',
    context: 'The next tap opens the camera.',
    before: 'Continue',
    after: 'Start Camera',
    reason: 'Name the specific tapped outcome. Use a verb and object, Title Case and no ending punctuation, within the button’s limits.',
    rule: 'Verb + object · 1–4 words · maximum 25 characters · Title Case · no ending punctuation',
    principle: 'Use Specific and Predictable CTAs and an Action-Oriented Language',
    type: 'button',
  },
  {
    id: 'pin',
    label: 'PIN code terminology',
    component: 'Input Field Label',
    context: 'An address field in the India product.',
    before: 'Enter your pincode',
    after: 'Enter your PIN code',
    reason: 'Use the standard market term and acronym.',
    rule: 'Use “PIN code” for the India address field.',
    principle: 'Use Clear, Simple, and Jargon-Free Language',
    type: 'label',
  },
  {
    id: 'amount',
    label: 'Available credit',
    component: 'Info Text',
    context: 'The screen shows how much available credit is in use.',
    before: 'You are using ₹4000 of ₹20,000 of your available credit.',
    after: 'You are using ₹4,000 of ₹20,000 of your available credit',
    reason: 'Apply currency grouping. The implemented change also removes the ending full stop.',
    rule: 'Apply the market’s currency and number-formatting guidance.',
    principle: 'Use Clear, Simple, and Jargon-Free Language',
    type: 'text',
  },
  {
    id: 'otp',
    label: 'Authentication code',
    component: 'Primary Button',
    context: 'The person is requesting an authentication code.',
    before: 'Send OTP',
    after: 'Get OTP',
    reason: 'Describe the person’s outcome using the preferred authentication action.',
    rule: 'Use the preferred authentication action, within the Primary Button’s limits.',
    principle: 'Use Specific and Predictable CTAs and an Action-Oriented Language',
    type: 'button',
  },
  {
    id: 'search',
    label: 'Transaction search',
    component: 'Input Placeholder',
    context: 'The field searches transactions.',
    before: 'Search for anything...',
    after: 'Search transactions',
    reason: 'Name the content the field actually searches.',
    rule: 'Make the placeholder specific to the searchable content.',
    principle: 'Provide Context and Helpful Guidance',
    type: 'placeholder',
  },
];

const rows = examples.flatMap((example) => example.id === 'pan' ? [
  {
    ...example,
    id: 'pan-empty',
    state: 'PAN · Empty field',
    reason: 'The field is empty. Ask the person to enter the missing information.',
  },
  {
    ...example,
    id: 'pan-filled',
    state: 'PAN · Already filled',
    after: example.filled,
    reason: 'The field is already filled. Ask the person to confirm the existing information.',
  },
] : [example]);

export default function RewriteExamples() {
  return (
    <div className={styles.examples} data-rewrite-examples="8" data-tracker-entries="8">
      <div className={styles.tableRegion} role="region" aria-label="Implemented India copy changes, scrollable comparison table" tabIndex={0}>
        <table className={styles.table}>
          <caption className={styles.caption}>Eight implemented India copy changes</caption>
          <thead>
            <tr>
              <th scope="col">Original copy</th>
              <th scope="col">Implemented copy</th>
              <th scope="col">Why it changed</th>
              <th scope="col">Branch principle</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((example) => (
              <tr key={example.id}>
                <td>{example.state && <span className={styles.state}>{example.state}</span>}{example.before}</td>
                <td>{example.after}</td>
                <td>{example.reason}</td>
                <td>{example.principle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
