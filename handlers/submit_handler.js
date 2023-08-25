const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const handleSubmit = async (e, globalInput, setPrediction, setError, error, selectedVersion, inputType, outputType) => {
    const endPoint = "/api/predictions";

    if (globalInput == {}) {
        setSubmittedWithoutInputs(true);
        return;
    }
    try {
        e.preventDefault();
        const response = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                version: selectedVersion,
                input: globalInput
            }),
        });

        let prediction = await response.json();

        if (response.status !== 201) {
            setError(prediction.detail);
            console.log(error, 'error from frontend');
            return;
        }

        setPrediction(prediction);

        while (prediction.status !== "succeeded" && prediction.status !== "failed") {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();

            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            setPrediction(prediction);
        }

    } catch (error) {
        console.log({ error });
    }
};

export default handleSubmit;


