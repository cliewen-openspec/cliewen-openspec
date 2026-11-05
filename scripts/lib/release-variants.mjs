// These are maintainer scenarios, not installed schema settings.
export const releaseVariants = {
  'csv-bom-final-tests': {schema: 'cliewen-delivery', base: 'scripts/prepare-csv-bom-trial.mjs', change: 'add-optional-csv-bom', placement: 'end-of-change'},
  'discovery-no-change': {schema: 'cliewen-discovery', base: 'scripts/prepare-csv-discovery-trial.mjs', change: 'review-csv-export', branch: 'no-change'},
  'discovery-delivery-handoff': {schema: 'cliewen-discovery', base: 'scripts/prepare-csv-discovery-trial.mjs', change: 'investigate-csv-marker', branch: 'delivery', handoff: 'add-csv-marker'},
  'combined-no-delivery': {schema: 'cliewen-all', base: 'scripts/prepare-csv-all-trial.mjs', change: 'review-csv-export', branch: ['no-change', 'further-investigation']},
};
