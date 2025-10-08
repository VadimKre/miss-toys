import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, UPDATE_TOY, ADD_TOY, REMOVE_TOY, SET_ISLOADING } from "../reducers/toys.reducer.js"

import { store } from "../store.js"
const { dispatch, getState } = store

const FALLBACK_FILTER = {
  name: '',
  inStock: null,
  labels: [],
}

export async function loadToys(filter) {
  const state = getState()
  const filterFromStore = state.filterModule?.filterBy
  const filterBy = filter ?? filterFromStore ?? FALLBACK_FILTER

  dispatch({ type: SET_ISLOADING, isLoading: true })

  try {
    const toys = await toyService.query(filterBy)
    dispatch({ type: SET_TOYS, toys })
    return toys
  } catch (err) {
    console.error('Error loading toys:', err)
    throw err
  } finally {
    dispatch({ type: SET_ISLOADING, isLoading: false })
  }
}

export async function removeToy(toyId) {
  dispatch({ type: SET_ISLOADING, isLoading: true })

  try {
    await toyService.remove(toyId)

    const toys = getState().toysModule?.toys || []
    const toy = toys.find((currToy) => currToy.id === toyId) || { id: toyId }

    dispatch({ type: REMOVE_TOY, toy })
  } catch (err) {
    console.error('Error removing toy:', err)
    throw err
  } finally {
    dispatch({ type: SET_ISLOADING, isLoading: false })
  }
}

export async function saveToy(toy) {
  dispatch({ type: SET_ISLOADING, isLoading: true })

  try {
    const savedToy = await toyService.save(toy)
    const actionType = toy.id ? UPDATE_TOY : ADD_TOY

    dispatch({ type: actionType, toy: savedToy })
    return savedToy
  } catch (err) {
    console.error('Error saving toy:', err)
    throw err
  } finally {
    dispatch({ type: SET_ISLOADING, isLoading: false })
  }
}
