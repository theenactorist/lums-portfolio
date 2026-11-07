import styles from './ArrowUpRightIcon.module.css';

// ArrowUpRight, regular weight, from Phosphor Icons (MIT): github.com/phosphor-icons/core
const arrowUpRightPath = 'M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z';

// The bare icon. The caller sizes it (the work cards draw it 16px inside their circle).
export default function ArrowUpRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={arrowUpRightPath} />
    </svg>
  );
}

// A link label followed by the icon for links that leave the page. The last word and the
// icon share a no-wrap span, so the icon never sits alone at the start of a line.
export function LinkArrowLabel({ children }) {
  const icon = <ArrowUpRightIcon className={styles.linkIcon} />;
  if (typeof children !== 'string') return <>{children}<span className={styles.keep}>{icon}</span></>;
  const text = children.trimEnd();
  const split = text.lastIndexOf(' ') + 1;
  return <>{text.slice(0, split)}<span className={styles.keep}>{text.slice(split)}{icon}</span></>;
}

// The same label as HTML, for case-study copy that is rendered from a trusted HTML string.
export function linkArrowLabelHtml(text) {
  const split = text.lastIndexOf(' ') + 1;
  return `${text.slice(0, split)}<span class="${styles.keep}">${text.slice(split)}<svg class="${styles.linkIcon}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="${arrowUpRightPath}"/></svg></span>`;
}
