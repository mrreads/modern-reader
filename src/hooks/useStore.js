import { useContext } from 'react';
import StoreContext from '@/contexts/store'

const useStore = (...list) => {
	let stores = useContext(StoreContext);
    return (list.length !== 0) ? list.map(name => stores[name]) : stores;
}

export default useStore;