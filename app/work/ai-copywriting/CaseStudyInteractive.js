'use client';

import { createPortal } from 'react-dom';
import FrameworkExplorer from './FrameworkExplorer';
import RewriteExamples from './RewriteExamples';
import CopyGPTSourceSnippet from './CopyGPTSourceSnippet';
import useCaseStudySlot from './useCaseStudySlot';

export default function CaseStudyInteractive({ framework, sourceSnippet }) {
  const frameworkTarget = useCaseStudySlot('copygpt-framework-slot');
  const examplesTarget = useCaseStudySlot('copygpt-examples-slot');
  const sourceTarget = useCaseStudySlot('copygpt-source-slot');
  return <>
    {frameworkTarget && createPortal(<FrameworkExplorer data={framework} />, frameworkTarget)}
    {examplesTarget && createPortal(<RewriteExamples />, examplesTarget)}
    {sourceTarget && createPortal(<CopyGPTSourceSnippet {...sourceSnippet} />, sourceTarget)}
  </>;
}
