import content from './polishedCaseContent.json';
import CaseStudyEnhancements from './CaseStudyEnhancements';
import CopyGPTChatPreview from './CopyGPTChatPreview';
import CaseStudyInteractive from './CaseStudyInteractive';
import framework from '@/content/reviews/copywriting-2026-10-01/framework-explorer.json';
import './shadcn.css';
import './field-guide.css';
import './polish.css';
import './shell-compat.css';
import './reference-fonts.css';
import styles from './clay-layout.module.css';

const explorerData = {
  brand: framework.brand,
  components: framework.components.map(({ id, name, documentation, v7 }) => ({ id, name, documentation, v7: { slots: v7.slots, rules: v7.rules } })),
  markets: framework.markets.map(({ id, name, locale, terminology, products, regulatedConstraints }) => ({ id, name, locale, terminology, products, regulatedConstraints })),
};
const primaryButton = framework.components.find(component => component.id === 'primary-button');
const sourceSnippet = {
  filename: 'components-v7.json',
  label: 'Primary Button · exact v7 text-position excerpt',
  code: JSON.stringify(primaryButton.v7.slots[0], null, 2),
};

export default function AICopywritingCaseStudy() {
  return (
    <main className={`case-study-body ${styles.page}`} id="copygpt-case">
      {/* Trusted build output from the approved local narrative and vetted references. */}
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
      <CaseStudyEnhancements />
      <CaseStudyInteractive framework={explorerData} sourceSnippet={sourceSnippet} />
      <CopyGPTChatPreview />
    </main>
  );
}
