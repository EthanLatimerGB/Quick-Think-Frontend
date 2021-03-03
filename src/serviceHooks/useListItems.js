import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_ALL_ITEMS } from '../graphql/queries';

const useListItems = () => {
	const { data, loading, error, refetch } = useQuery(FETCH_ALL_ITEMS, {
		fetchPolicy: "no-cache"
	});

	const filteredData = useMemo(() => {
		if(data){
			console.log(data);
			const itemList = data ? data.listItems : null;
			return itemList;
		}
	}, [data]);

	return { data: filteredData, loading, error, refetch };
};

export default useListItems;