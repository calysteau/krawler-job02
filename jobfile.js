import path from 'path'
import { fileURLToPath } from 'url'

console.log( "krawler-job02");

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log( __dirname);

export default {
  id: 'population-departements',
  store: 'memory', // Default job store
  tasks: [{
    id: 'departements.json',
    type: 'http', // Download task
    options: {
      url: `https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson`
    }
  }, {
    id: 'population.csv',
    type: 'store', // Read task
    options: { store: 'fs' }
  }],
  hooks: {
    tasks: {
      after: {
        readJson: {
          match: { id: 'departements.json' },
          features: true
        },
        readCSV: {
          match: { id: 'population.csv' },
          headers: true, delimiter: ';' // Default delimiter is ,
        },
        writeJson: { store: 'fs' }
      }
    },
    jobs: {
      before: {
      createStores: [
          { id: 'memory' }, // Input store
          { id: 'fs', type: 'fs', options: { path: __dirname } } // Output store
        ]
      },
      after: {
        // Add population to departement features
        // Order is important here as the merge will keep first matching item so that we reorder to ensure department features first
        mergeJson: {
          deep: true,
          sortBy: (item) => item.properties ? Number(item.properties.code) : 999,
          mergeBy: (item) => item.Code || item.properties.code,
          transform: { mapping: { Ensemble: 'population' }, unitMapping: { population: { asNumber: true } }, pick: ['population'] }
        },
        convertToGeoJson: {},
        writeJson: { store: 'fs' },
        clearOutputs: {}, // Cleanup
        removeStores: ['memory', 'fs']
      }
    }
  }
}
