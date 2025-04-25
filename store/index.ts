import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, RootStateType } from './store'

// Use bellow hooks in app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatchType>()
export const useAppSelector = useSelector.withTypes<RootStateType>()