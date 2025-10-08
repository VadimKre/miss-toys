import { SET_FILTER } from '../reducers/filter.reducer.js'
import { store } from '../store.js'
import { loadToys } from './toys.actions.js'

const { dispatch, getState } = store

const EMPTY_FILTER = {
  name: '',
  inStock: null,
  labels: [],
}

export function setToyFilter(partialFilter) {
  const current = getState().filterModule?.filterBy ?? EMPTY_FILTER
  const filterBy = { ...current, ...partialFilter }
  dispatch({ type: SET_FILTER, filterBy })
  return loadToys(filterBy)
}
