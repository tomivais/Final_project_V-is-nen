const Pause = async (sessionId) => {
    console.log("Session ID:llä: ", sessionId);

    const pausetime = new Date(Date.now() + 2 * 60 * 60 * 1000);
    console.log("Aikaleima luotu: ", pausetime.toISOString());

    const response = await fetch(`http://localhost:3000/studies/${sessionId}`);
    console.log("Vastaus: ", response);



    try {
        // First, check if the session exists
        const response = await fetch(`http://localhost:3000/studies/${sessionId}`);
        const resp = await response.json();

        if (Object.keys(resp).length === 0) {
            console.log("Session ID:llä ei löydy aikaleimaa.");
            return { success: false, message: "Session ID:llä ei löydy aikaleimaa." };
        } else {
            // Update the session with the new pausetime
            const updateResponse = await fetch(`http://localhost:3000/studies/${sessionId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pausetime: pausetime // Lisää pausetime kenttä
                })
            });

            if (updateResponse.ok) {
                console.log("Pausetime tallennettu onnistuneesti");
                return { success: true };
            } else {
                console.log("Pausetimen tallentaminen epäonnistui");
                return { success: false, message: "Pausetimen tallentaminen epäonnistui" };
            }
        }
    } catch (error) {
        console.error("Virhe tallennuksessa: ", error);
        return { success: false, message: "Virhe tallennuksessa: " + error.message };
    }
};

export default Pause;