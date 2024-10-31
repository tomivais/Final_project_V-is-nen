const End = async (sessionId) => {
    const make_endtime = new Date(Date.now()); // Calculate end time
    console.log("Endtime luotu: ", make_endtime);

    const endtime = make_endtime.toLocaleString('fi-FI', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    try {
        // Fetch the session details based on sessionId
        const response = await fetch(`http://localhost:3000/studies?id=${sessionId}`);

        // Check if response is OK (status code 200-299)
        if (!response.ok) {
            console.error("Virhe sessiota haettaessa:", response.statusText);
            return { success: false, message: "Virhe sessiota haettaessa." };
        }

        const resp = await response.json();

        // Check if the response is empty
        if (Object.keys(resp).length === 0) {
            console.log("Session ID:llä ei löydy aikaleimaa.");
            return { success: false, message: "Session ID:llä ei löydy aikaleimaa." };
        } else {
            // Update the session with the new endtime
            const updateResponse = await fetch(`http://localhost:3000/studies/${sessionId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    endtime: endtime // Add endtime field
                })
            });

            // Check if the update response is OK
            if (updateResponse.ok) {
                console.log("Endtime tallennettu onnistuneesti");
                return { success: true };
            } else {
                console.error("Endtimen tallentaminen epäonnistui:", updateResponse.statusText);
                return { success: false, message: "Endtimen tallentaminen epäonnistui." };
            }
        }
    } catch (error) {
        console.error("Virhe tallennuksessa: ", error);
        return { success: false, message: "Virhe tallennuksessa: " + error.message };
    }
};

export default End;
