'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/work/ai-copywriting/ui/tabs';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/work/ai-copywriting/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/app/work/ai-copywriting/ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/work/ai-copywriting/ui/table';
import styles from './FrameworkExplorer.module.css';

const productNames = {
  loans: 'Loans',
  credit_score: 'Credit score',
  wallet: 'Wallet',
  savings: 'Savings',
  investments: 'Investments',
  debit_cards: 'Debit cards',
  rewards: 'Rewards',
};

const positionNames = {
  text: 'Text', title: 'Title', body: 'Body', message: 'Message', cta: 'CTA',
  headline: 'Headline', label: 'Label', value: 'Value', hint: 'Hint', error: 'Error',
  header: 'Header', cell: 'Cell', description: 'Description', subtitle: 'Subtitle',
  row_labels: 'Row labels', footer: 'Footer', heading: 'Heading',
};

function limitText(range, singular) {
  if (!range) return null;
  const plural = `${singular}s`;
  if (range.min !== undefined && range.max !== undefined) {
    return range.min === range.max
      ? `${range.max} ${range.max === 1 ? singular : plural}`
      : `${range.min}–${range.max} ${plural}`;
  }
  if (range.max !== undefined) return `Up to ${range.max} ${range.max === 1 ? singular : plural}`;
  return `At least ${range.min} ${range.min === 1 ? singular : plural}`;
}

function slotLimits(limits = {}) {
  return [
    limitText(limits.characters, 'character'),
    limits.characters_per_line ? `${limits.characters_per_line.max} characters per line` : null,
    limitText(limits.words, 'word'),
    limitText(limits.lines, 'line'),
  ].filter(Boolean);
}

function slotStyling(styling = {}) {
  const rules = [];
  if (styling.casing) rules.push(styling.casing === 'title_case' ? 'Title Case' : 'Sentence case');
  if (styling.terminal_punctuation !== undefined) rules.push(styling.terminal_punctuation ? 'Ending punctuation' : 'No ending punctuation');
  if (styling.ellipsis_allowed !== undefined) rules.push(styling.ellipsis_allowed ? 'Ellipsis allowed' : 'No ellipsis');
  if (styling.exclamation_allowed !== undefined) rules.push(styling.exclamation_allowed ? 'Exclamation marks allowed' : 'No exclamation marks');
  if (styling.question_allowed) rules.push('Question marks allowed');
  if (styling.colon_allowed === false) rules.push('No colon');
  if (styling.numeric_formatting) rules.push('Market-specific number formatting');
  if (styling.remove_leading_zeros) rules.push('Remove leading zeros');
  if (styling.numeric_overflow_format) rules.push(`Overflow: ${styling.numeric_overflow_format}`);
  return rules;
}

function Examples({ label, text }) {
  if (!text?.trim()) return null;
  return (
    <div className={styles.exampleGroup}>
      <h4 className={styles.smallHeading}>{label}</h4>
      <div className={styles.exampleText}>{text.trim().replace(/^\s*-\s*/gm, '')}</div>
    </div>
  );
}

function ComponentView({ components, selectedId, onSelect }) {
  const component = components.find((item) => item.id === selectedId) || components[0];
  const { documentation, v7 } = component;
  const structure = v7.rules?.structure_pattern;

  return (
    <div className={styles.panel}>
      <div className={styles.selectorRow}>
        <div className={styles.selectorField}>
          <label htmlFor="copygpt-component-select" className={styles.label}>Component</label>
          <Select value={component.id} onValueChange={onSelect}>
            <SelectTrigger id="copygpt-component-select" className={styles.componentSelect}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {components.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className={styles.scope}>{components.length} components · {components.reduce((count, item) => count + item.v7.slots.length, 0)} text positions</div>
      </div>

      <div className={styles.componentIntroduction}>
        <h3 className={styles.componentTitle}>{component.name} details</h3>
        <p className={styles.paragraph}>{v7.rules?.use_case || documentation.useCase}</p>
      </div>

      <div className={styles.rulesBlock}>
        <h4 className={styles.smallHeading}>Writing rules</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Text position</TableHead>
              <TableHead>Limits</TableHead>
              <TableHead>Formatting</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {v7.slots.map((slot) => (
              <TableRow key={slot.id}>
                <TableCell className={styles.wrapCell}>
                  <strong>{positionNames[slot.id] || slot.id}</strong>
                  <span className={styles.required}>{slot.required ? 'Required' : 'Optional'}</span>
                </TableCell>
                <TableCell className={styles.wrapCell}><div className={styles.cellLines}>{slotLimits(slot.limits).map((line) => <span key={line}>{line}</span>)}</div></TableCell>
                <TableCell className={styles.wrapCell}><div className={styles.cellLines}>{slotStyling(slot.styling).map((line) => <span key={line}>{line}</span>)}</div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={styles.source}>v7 component rules</div>
      </div>

      {structure && (
        <div className={styles.phrasing}>
          <h4 className={styles.smallHeading}>Sentence phrasing</h4>
          {typeof structure === 'string' ? <p className={styles.paragraph}>{structure}</p> : (
            <dl className={styles.definitionList}>
              {Object.entries(structure).map(([key, value]) => <div key={key}><dt>{positionNames[key] || key}</dt><dd>{value}</dd></div>)}
            </dl>
          )}
        </div>
      )}

      <div className={styles.contextGrid}>
        <div>
          <h4 className={styles.smallHeading}>Purpose and tone</h4>
          <p className={styles.paragraph}>{documentation.rationale}</p>
          <dl className={styles.definitionList}>
            <div><dt>Category</dt><dd>{documentation.category}</dd></div>
            <div><dt>Tone</dt><dd>{documentation.tone.replace(/\s+/g, ' ').trim().replace(/,$/, '')}</dd></div>
          </dl>
        </div>
        {v7.rules?.transformation_rules?.length > 0 && (
          <div>
            <h4 className={styles.smallHeading}>How to write it</h4>
            <ul className={styles.ruleList}>{v7.rules.transformation_rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          </div>
        )}
      </div>

      <div className={styles.examples}>
        <div className={styles.examplesHeading}>
          <h4 className={styles.smallHeading}>Examples from the component guidelines</h4>
          <span className={styles.source}>Original team documentation</span>
        </div>
        <div className={styles.exampleColumns}>
          <Examples label="Good examples" text={documentation.goodExamples} />
          <Examples label="Bad examples" text={documentation.badExamples} />
        </div>
        <p className={styles.exampleNote}>These examples preserve the original guidelines. The v7 rules above govern final casing and limits.</p>
      </div>

      {documentation.principles?.length > 0 && (
        <div>
          <h4 className={styles.smallHeading}>Applicable brand principles</h4>
          <ul className={styles.principleList}>{documentation.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

function MarketView({ markets, selectedId, onSelect }) {
  const market = markets.find((item) => item.id === selectedId) || markets[0];
  const terms = market.terminology.standard_terms;
  const replacements = market.regulatedConstraints.jargon_replacements;
  const productTerm = market.terminology.product_terms;
  const namingRows = [
    ['Phone field', terms.phone_number],
    ['Email field', terms.email_id],
    ['Referral field', terms.referral_code],
    ['Support', terms.support],
    ...(terms.pincode ? [['Postal address', terms.pincode]] : []),
    ...(productTerm.savings_product ? [['Product term', productTerm.savings_product], ['Excluded product term', 'investments']] : []),
    ...(productTerm.investment_product ? [['Product term', productTerm.investment_product], ['Excluded product term', 'savings']] : []),
    ...Object.entries(replacements).map(([term, wording]) => [term, wording]),
  ];

  return (
    <div className={styles.panel}>
      <ToggleGroup type="single" value={market.id} onValueChange={(value) => { if (value) onSelect(value); }} aria-label="Choose a market">
        {markets.map((item) => <ToggleGroupItem key={item.id} value={item.id}>{item.name}</ToggleGroupItem>)}
      </ToggleGroup>

      <div className={styles.marketOverview}>
        <div>
          <h4 className={styles.smallHeading}>Products</h4>
          <p className={styles.paragraph}>{market.products.available.map((product) => productNames[product]).join(', ')}</p>
          {market.products.wallet?.mpesa_terminology?.note && <p className={styles.paragraph}>{market.products.wallet.mpesa_terminology.note}</p>}
        </div>
        <dl className={styles.definitionList}>
          <div><dt>Currency</dt><dd>{market.locale.currency_symbol} · {market.locale.currency_code}</dd></div>
          <div><dt>Identity verification</dt><dd>{market.products.kyc_onboarding.verification_methods.join(', ')}</dd></div>
          <div><dt>Date format</dt><dd>{market.locale.date_style}<br />{market.locale.date_examples[0]}</dd></div>
          {market.locale.number_format.grouping_note && <div><dt>Number format</dt><dd>{market.locale.number_format.grouping_note}</dd></div>}
        </dl>
      </div>

      <div className={styles.marketGrid}>
        <div>
          <h4 className={styles.smallHeading}>Preferred terminology</h4>
          <Table>
            <TableHeader><TableRow><TableHead>Context</TableHead><TableHead>Use</TableHead></TableRow></TableHeader>
            <TableBody>{namingRows.map(([context, wording]) => <TableRow key={context}><TableCell className={styles.wrapCell}>{context}</TableCell><TableCell className={styles.wrapCell}>{wording}</TableCell></TableRow>)}</TableBody>
          </Table>
        </div>
        <div className={styles.requirements}>
          <div>
            <h4 className={styles.smallHeading}>Keep these terms</h4>
            <p className={styles.paragraph}>{market.regulatedConstraints.keep_as_is.join(', ')}</p>
          </div>
          <div>
            <h4 className={styles.smallHeading}>Prohibited phrases</h4>
            <ul className={styles.ruleList}>{market.regulatedConstraints.prohibited_phrases.map((phrase) => <li key={phrase}>“{phrase}”</li>)}</ul>
          </div>
        </div>
      </div>
      <div className={styles.source}>Product and market context documented for this project in v7.</div>
    </div>
  );
}

function BrandView({ brand, selectedId, onSelect }) {
  const principle = brand.principles.find((item) => item.id === selectedId) || brand.principles[0];
  const index = brand.principles.indexOf(principle);

  return (
    <div className={styles.panel}>
      <div className={styles.selectorField}>
        <label htmlFor="copygpt-principle-select" className={styles.label}>Brand principle</label>
        <Select value={principle.id} onValueChange={onSelect}>
          <SelectTrigger id="copygpt-principle-select" className={styles.principleSelect}><SelectValue>Principle {index + 1} of {brand.principles.length}</SelectValue></SelectTrigger>
          <SelectContent position="popper"><SelectGroup>{brand.principles.map((item, index) => <SelectItem key={item.id} value={item.id}>{index + 1}. {item.title}</SelectItem>)}</SelectGroup></SelectContent>
        </Select>
      </div>
      <div className={styles.brandGuidance}>
        <h4 className={styles.principleTitle}>{principle.title}</h4>
        <p className={styles.paragraph}>{principle.description}</p>
        <div>
          <h4 className={styles.smallHeading}>Writing technique</h4>
          <p className={styles.paragraph}>{principle.technique}</p>
        </div>
      </div>
      <div className={styles.source}>The ten principle names come from the original brand guidelines; descriptions and techniques come from the v7 brand reference.</div>
    </div>
  );
}

export default function FrameworkExplorer({ data }) {
  const [componentId, setComponentId] = useState('primary-button');
  const [marketId, setMarketId] = useState('IN');
  const [principleId, setPrincipleId] = useState('concise');

  return (
    <div className={styles.explorer}>
      <Tabs defaultValue="components">
        <TabsList aria-label="Explore the writing guidance">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
        </TabsList>
        <TabsContent value="components"><ComponentView components={data.components} selectedId={componentId} onSelect={setComponentId} /></TabsContent>
        <TabsContent value="markets"><MarketView markets={data.markets} selectedId={marketId} onSelect={setMarketId} /></TabsContent>
        <TabsContent value="brand"><BrandView brand={data.brand} selectedId={principleId} onSelect={setPrincipleId} /></TabsContent>
      </Tabs>
    </div>
  );
}
