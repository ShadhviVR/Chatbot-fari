
const cancelPrediction = async (cancelUrl) => {

    console.log(process.env.REPLICATE_API_TOKEN, 'apiToken from cancel handler');
    console.log(cancelUrl, 'cancelUrl from cancel handler');

    try {

        const response = await fetch(cancelUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Authorization: process.env.REPLICATE_API_TOKEN,
                "Content-Type": "application/json",
                "Origin": "http://localhost:3002",
                "Referer": "http://localhost:3002/",
            },
        });
        if (response.ok) {
            console.log("Prediction canceled successfully");
            // const data = await response.json();
            // console.log(data, 'response from cancel handler')
        } else {
            throw new Error("Failed to cancel prediction")
        }
    } catch (error) {
        console.error("Error canceling prediction:", error);
    }
};

export default cancelPrediction;