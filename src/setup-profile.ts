import {createInterface} from 'node:readline/promises';
import {profileSnapshot, setupProfile, type SetupProfile} from './core.js';

export async function selectSetupProfile(root: string, selected: string | undefined, options: {
  interactive: boolean; concurrent: boolean; sharedReview: boolean; enableReview: boolean; existingOnly?: boolean;
}) {
  const {interactive, existingOnly} = options;
  let {concurrent, sharedReview, enableReview} = options;
  let profile: SetupProfile | undefined = selected === undefined ? undefined : setupProfile(selected);
  if (!profile && !interactive) return;
  const basis = profileSnapshot(root, existingOnly);
  const terminal = interactive ? createInterface({input: process.stdin, output: process.stderr}) : undefined;
  const abort = new AbortController();
  terminal?.once('SIGINT', () => terminal.close());
  terminal?.once('close', () => abort.abort());
  const ask = (question: string) => terminal!.question(question, {signal: abort.signal});
  const yes = async (question: string) => /^y(?:es)?$/i.test((await ask(question)).trim());
  try {
    if (!profile) {
      const explanation = basis.settings === undefined
        ? 'Assign acceptance IDs locally. Agents are asked to test each implementation task and collect evidence. Test quality and lifecycle findings are advisory. Set up CI separately if you use it.'
        : 'Keep your current settings if you choose a profile later.';
      process.stderr.write(`${explanation}\nSee all settings at https://cliewen-openspec.github.io/guide/configuration.html#full-defaults\n`);
      const choice = (await ask('How do you work on this project? Solo / Team / Choose later [later]: ')).trim().toLowerCase();
      if (!choice || choice === 'later' || choice === 'choose later') return;
      profile = setupProfile(choice);
    }
    if (terminal) {
      process.stderr.write(`Setup profile: ${basis.current ?? 'none'} → ${profile}\n`);
      if (!concurrent && !basis.coordinated) concurrent = await yes('Can separate clones or worktrees allocate IDs concurrently? [y/N] ');
      if (profile === 'team' && !sharedReview && !basis.review) sharedReview = await yes('Does the team review changes together? [y/N] ');
    }
    if (enableReview && (profile !== 'team' || !sharedReview)) throw Error('Use --enable-review with a team profile and --shared-review.');
    const reviewRecommended = profile === 'team' && sharedReview && !basis.review;
    const recommendations = [];
    if (concurrent && !basis.coordinated) {
      recommendations.push('Preview Git coordination with cliewen-openspec ac coordinate REMOTE. Concurrent allocation needs a shared authority.');
    }
    if (profile === 'team') recommendations.push('Use the project’s existing integration policy for review and CI.');
    if (reviewRecommended) recommendations.push('Enable features.review for agents to prepare changes for team review (false → true).');
    if (terminal) {
      for (const recommendation of recommendations) process.stderr.write(`${recommendation}\n`);
      if (reviewRecommended && !enableReview) enableReview = await yes('Enable features.review? [y/N] ');
    }
    return {
      selection: {profile, enableReview, basis},
      summary: {current: basis.current ?? null, proposed: profile, recommendations, settings: reviewRecommended ? [{key: 'features.review', current: false, proposed: true, selected: enableReview}] : []}
    };
  } finally {
    terminal?.close();
  }
}
