import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_RESPONSE } from "../graphql/queries";

const useItemResponse = () => {
	const [verifyResponse, result] = useMutation(VERIFY_RESPONSE);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		setResponse(null);
		if (result.data) {
			setResponse(result.data.verifyResponse);
		}
	}, [result]);

	return { verifyResponse, response };
};

export default useItemResponse;
